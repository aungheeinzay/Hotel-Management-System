import {Document} from "mongoose";

export type ID={
    _id:string
}
type roomImages={
    url:string
    public_id:string
}
export type RoomType={
    roomNumber:string
    type:string
    location:string
    title:string
    description:string
    pricePerNight:number
    capacity:number
    isAvailable:boolean
    images:roomImages[]
    reviews:string[]
}

export type ServerResponseRoom=ID & RoomType


//user type

export interface UserType extends ID {
    username:string
    email:string
    password:string
    role?:string[]
    avatar:{
        url:string
        public_id:string
    }
    resetPasswordToken:String | undefined
    restPasswordExpire:Date | undefined
    generatePasswordResetToken():string
    createdAt?:string
    updatedAt?:string
}

export interface RoomFilters{
    type?:string
    pricePerNight?:number
    capacity?:number
    isAvailable?:boolean
    location?:string
}

