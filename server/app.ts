import express, {type Request, type Response} from "express"
import dotenv from "dotenv"
import { dbconnect } from "./config/dbconnect";
import { startApolloServer } from "./apollo/apolloServer";

import cookieParser from "cookie-parser"

declare global {
    namespace Express {
        interface Request {
            rawBody: string;
        }
    }
}


dotenv.config({
    path: ".env.local"
})

const app = express()
const port = process.env.PORT || 8000


dbconnect()


app.use(express.json({
    verify: (req: Request, res: Response, buf: Buffer) => {
        req.rawBody = buf.toString();
    }
}));

app.use(cookieParser())
await startApolloServer(app);

app.listen(port, () => {
    console.log("Server is running on port " + port)
})