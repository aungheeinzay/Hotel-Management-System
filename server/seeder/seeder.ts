import mongoose from "mongoose";
import {Room} from "../model/room";
import {rooms} from "./data";
import dotenv from "dotenv";
import path from "path"
import {fileURLToPath} from "node:url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({
    path:path.join(__dirname,"../config/.env.local")
})
const seedRooms =async ()=>{
    console.log("env uri",process.env.MONGODB_URI_LOCAL)
    try{
        await mongoose.connect(process.env.MONGODB_URI_LOCAL!)
        await Room.deleteMany()
        console.log("room are deleted successfully")
        await Room.insertMany(rooms)
        console.log("rooms are inserted")
        process.exit(1)
    }catch (e){
        console.log("error while inserting room",e)
        process.exit(1)
    }
}

seedRooms();