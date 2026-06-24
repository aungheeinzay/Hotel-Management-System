import mongoose, {Document, model, Schema} from "mongoose";
import bcrypt from "bcrypt"
import * as crypto from "node:crypto";
import type {UserType} from "../lib/type";
import hashResetToken from "../lib/hashResetToken";
const userSchema = new Schema<UserType>({
    username:{
        type:String,
        required:[true,"username is required"],

    },
    email:{
        type:String,
        unique:[true,"email already exists"],
        required:[true,"email is required"]
    },
    password:{
        type:String,
        required:[true,"password is required"],
        minLength:[6,"password must be at least 6 characters"],
        select:false
    },
    avatar:{
       url:String,
       public_id:String
    },
    role:{
        type:[String],
        default:"user",
        enum:{
            values:["user","admin"],
            message:"please select a correct role"
        }
    },
    resetPasswordToken:String,
    restPasswordExpire:String
},{timestamps:true})
userSchema.pre("save",async function (){
    if (this.isModified("password")){
        this.password=await  bcrypt.hash(this.password,10)
    }
})

userSchema.methods.generatePasswordResetToken =  function (){
    const token = crypto.randomBytes(20).toString("hex")
    this.resetPasswordToken=hashResetToken(token)
    this.restPasswordExpire=Date.now()+15*60*1000;
    return token
}
export const User = model("User",userSchema)
