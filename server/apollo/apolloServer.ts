import {makeExecutableSchema} from "@graphql-tools/schema";
import {ApolloServer} from "@apollo/server";
import {type Application, json,type Request,type Response} from "express";
import {expressMiddleware} from "@as-integrations/express5";
import {roomTypeDefs} from "../graphql/typeDefs/room";
import {roomResolver} from "../graphql/resolvers/room";
import cors from "cors";
import {userTypeDefs} from "../graphql/typeDefs/user";
import {userResolvers} from "../graphql/resolvers/user";
import {applyMiddleware} from "graphql-middleware";
import {permession} from "../lib/permession";
import {decodedToken} from "../lib/jwt";
import {User} from "../model/user";
import {bookingTypeDefs} from "../graphql/typeDefs/booking";
import {bookingResolvers} from "../graphql/resolvers/booking";
type JWTPayload = {
    id:string
}



export const startApolloServer=async (app:Application)=>{
    const typeDefs=[roomTypeDefs,userTypeDefs,bookingTypeDefs];
    const resolvers=[roomResolver,userResolvers,bookingResolvers];
    const schema = makeExecutableSchema({
        typeDefs,
        resolvers,
    })

const schemaWithShields =  applyMiddleware(schema,permession)
    const apolloServer = new ApolloServer({
        schema:schemaWithShields,
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
    console.log(process.env.CLIENT_URL!)
    app.use("/graphql",cors({
        credentials:true,
        origin:true
    }),json(), expressMiddleware(apolloServer,{
        context:async({req,res}:{req:Request,res:Response})=>{
            let user = null;
            const token = req.cookies?.token
            let userId=null

            if (token){
                try {
                const decode =await decodedToken(token) as JWTPayload
                  user =  await User.findById(decode.id)
                    userId=user?.id
                }catch (error){
                  //  throw new Error("invalid token")
                    console.log("token authentication failed",error)
                }
            }
            return {req,res,user,userId}
        }
    }))
}