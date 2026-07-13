import {makeExecutableSchema} from "@graphql-tools/schema";
import {ApolloServer} from "@apollo/server";
import {type Application, json,type Request,type Response} from "express";
import {expressMiddleware} from "@as-integrations/express5";
import {roomTypeDefs} from "../graphql/typeDefs/room.js";
import {roomResolver} from "../graphql/resolvers/room.js";
import cors from "cors";
import {userTypeDefs} from "../graphql/typeDefs/user.js";
import {userResolvers} from "../graphql/resolvers/user.js";
import {applyMiddleware} from "graphql-middleware";
import {permession} from "../lib/permession.js";
import {decodedToken} from "../lib/jwt.js";
import {User} from "../model/user.js";
import {bookingTypeDefs} from "../graphql/typeDefs/booking.js";
import {bookingResolvers} from "../graphql/resolvers/booking.js";
import {PaymentTypeDefs} from "../graphql/typeDefs/payment.js";
import {paymentResolver} from "../graphql/resolvers/payment.js";
import {webhookHandler} from "../controller/Payment.js";
import {reviewTypeDefs} from "../graphql/typeDefs/review.js";
import {reviewResolvers} from "../graphql/resolvers/review.js";
import {WebSocketServer} from "ws"
import {createServer} from "node:http";
import {useServer} from "graphql-ws/use/ws";
import dotenv from "dotenv";
dotenv.config({
    path:".env.local"
})

type JWTPayload = {
    id:string
}



export const startApolloServer=async (app:Application)=>{
    const typeDefs=[roomTypeDefs,userTypeDefs,bookingTypeDefs,PaymentTypeDefs,reviewTypeDefs];
    const resolvers=[roomResolver,userResolvers,bookingResolvers,paymentResolver,reviewResolvers];
    const schema = makeExecutableSchema({
        typeDefs,
        resolvers,
    })

const schemaWithShields =  applyMiddleware(schema)

const httpServer = createServer(app)

    const wsServer = new WebSocketServer({
        server:httpServer,
        path:"/graphql"
    })

    //start apollo subscription server
const wsCleanUp = useServer({
    schema:schemaWithShields,
    context:async(ctx)=>{
        const connectionParams = ctx.connectionParams as { headers?: { Authorization?: string } } | undefined;
        const authHeader = connectionParams?.headers?.Authorization

        let token = null;
        if (authHeader && authHeader.startsWith("Bearer ")) {
            token = authHeader.split(" ")[1];
    }
        let user = null;
        let userId = null;

        if (token) {
            try {
                const decode = await decodedToken(token) as JWTPayload;
                user = await User.findById(decode.id).select("-password");
                userId = user?.id;
            } catch (error) {
                console.log("WS Token validation failed");
            }
        }
        return { user, userId };
    }
},wsServer)


    const apolloServer = new ApolloServer({
        schema:schemaWithShields,
        plugins:[
            {
                async serverWillStart(){
                    return {
                        async drainServer(){
                            await wsCleanUp.dispose()
                        }
                    }
                }
            }
        ],
        introspection:true})
    await apolloServer.start();
    // app.use("/graphql", (req, res, next) => {
    //     res.header("Access-Control-Allow-Origin", "http://localhost:5173");
    //     res.header("Access-Control-Allow-Credentials", "true");
    //     res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    //     res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    //
    //     if (req.method === "OPTIONS") {
    //         return res.sendStatus(200); // Preflight request ကို handle လုပ်
    //     }
    //     next();
    // });
    app.use("/graphql",cors({
        credentials:true,
        origin:[process.env.CLIENT_URL!]
    }),json({limit:"50mb"}), expressMiddleware(apolloServer,{
        context:async({req,res}:{req:Request,res:Response})=>{
            let user = null;
            const token = req.cookies?.token
            let userId=null

            if (token){
                try {
                const decode =await decodedToken(token) as JWTPayload
                  user =  await User.findById(decode.id).select("-password")
                    userId=user?.id
                }catch (error){
                  //  throw new Error("invalid token")
                    console.log("token authentication failed",error)
                }
            }
            return {req,res,user,userId}
        }
    }));


    app.post("/api/payment/webhook",async (req:Request,res:Response)=>{
        const stripeSignature = req.headers['stripe-signature']
        try {
            const isSuccess = await webhookHandler(stripeSignature, req.rawBody);

            if (isSuccess) {
                console.log("✅ Booking updated via webhook successfully!");
                res.status(200).json({ received: true });
            } else {

                res.status(200).json({ received: true, message: "Unhandled event type" });
            }
        } catch (error: any) {
            console.error("❌ Webhook Error:", error.message);
            res.status(400).json({ error: `Webhook Error: ${error.message}` });
        }
    })
    const port = process.env.PORT || 8000
    httpServer.listen(port, () => {
        console.log("Server is running on port " + port)
    })
}