import express from "express";
import dotenv from "dotenv";
import { dbconnect } from "./config/dbconnect.js";
import { startApolloServer } from "./apollo/apolloServer.js";
import cookieParser from "cookie-parser";
dotenv.config({
    path: ".env.local"
});
const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
await dbconnect();
app.use(express.json({
    verify: (req, res, buf) => {
        req.rawBody = buf.toString();
    }
}));
app.use(cookieParser());
await startApolloServer(app);
