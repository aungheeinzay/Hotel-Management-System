import express from "express"
import dotenv from "dotenv"
import { dbconnect } from "./config/dbconnect";
import { startApolloServer } from "./apollo/apolloServer";
import cors from "cors"
import {User} from "./model/user";
import cookieParser from "cookie-parser"
dotenv.config({
    path: ".env.local"
})

const app = express()
const port = process.env.PORT || 8000


dbconnect()



app.use(express.json())
app.use(cookieParser())
await startApolloServer(app);

app.listen(port, () => {
    console.log("Server is running on port " + port)
})