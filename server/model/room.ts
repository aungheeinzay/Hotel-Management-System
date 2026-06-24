import {model, Schema} from "mongoose";

const roomSchema = new Schema({
    roomNumber:{
        type:String,
        required:[true,'please enter room number']
    },
    type:{
        type:String,
        required:[true,'please enter room type']
    },
    pricePerNight:{
        type:Number,
        required:[true,"please enter price per night"]
    },
    title:String,
    description:String,
    capacity:{
        type:Number,
        required:[true,'please enter room capacity']
    },
    location:{
        type:String,
        required:[true,'please enter room location']
    },
    isAvailable:{
        type:Boolean,
        required:[true,'please enter room isAvailable']
    },
    images:[
        {
        url:String,
        public_id:String
        }
    ],
    reviews:[String]



},{timestamps:true})

export const Room = model("Room",roomSchema)

// id:ID!
// roomNumber:String
// type:String!
// pricePerNight:Float!
// capacity:Int!
// isAvailable:Boolean!
// images:[RoomImages]
// reviews:[String]
// createdAt:String!
// updatedAt:String!
// }