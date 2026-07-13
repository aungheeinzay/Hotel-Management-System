
import {User} from "../model/user";
import type {UserType} from "../lib/type";
import bcrypt from "bcrypt";
import type {Response} from "express"
import {createToken} from "../lib/jwt";
import errorHandler from "../lib/errorHandler";
import {NotFoundError} from "../lib/notFound";
import {deleteImage, uploadSingleImage} from "../lib/cloudinary";
import {forgetPasswordEmailTemplate} from "../lib/forget-email";
import {sendEmail} from "../lib/sendEmail";
import hashResetToken from "../lib/hashResetToken";


export const registerUser =errorHandler( async (input:Pick<UserType, "username" | "email" | "password">)=>{
    const {username,email,password} = input

    return User.create({
        username,
        email,
        password
    })
})

export const Login = errorHandler(async ({email,password}:Pick<UserType, "email" | "password">,res:Response)=>{
    const isUser =await User.findOne({email}).select("+password")
    if (!isUser){
        throw new NotFoundError("email or password wrong")
    }
    const isMatch = await bcrypt.compare(password,isUser.password)
    if (!isMatch){
        throw new NotFoundError("email or password wrong")
    }
    const token = await createToken({id:isUser.id})
    res.cookie("token",token,{
        httpOnly:true,
        sameSite:"none",
        secure:process.env.NODE_ENV=="production",
        maxAge:7*24*60*60*1000
    })
    return isUser
})

export const uploadAvator=errorHandler(async (image:string,userId:string)=>{
        const userDoc = await User.findById(userId)
    if (!userDoc)throw new NotFoundError("user doesn't exist")
    const avatar = await uploadSingleImage(image,"avator")
    console.log("upload",avatar)
    if (userDoc.avatar?.public_id){
        await deleteImage(userDoc.avatar.public_id)
    }
    await User.findByIdAndUpdate(userId,{
        avatar
    })
    return true
})

export const UpdateUserNameEmail=errorHandler(async (user:Partial<UserType>,userId:string)=>{
    const userDoc = await User.findById(userId)
    if(!userDoc)throw new NotFoundError("user doesn't exist")
    console.log("user",user)
    const result = await userDoc.set({...user}).save()
    console.log(result)
    return true

})

export const updatePassword=errorHandler(async (oldPassword:string,newPassword:string,userId:string)=>{
const userDoc = await User.findById(userId).select("password")
    if (!userDoc)throw new NotFoundError("user doesn't exist")
    console.log(userDoc.password)
        const isMatch = await bcrypt.compare(oldPassword,userDoc.password)
    if (!isMatch)throw new Error("wrong password")
    userDoc.password=newPassword;
    await userDoc.save()
    return true
})

export const forgetPassword = errorHandler(async (customerEmail:string)=>{
    const isUser = await User.findOne({email:customerEmail})
    if (!isUser)throw new NotFoundError("user doesn't exist");
    const resetToken = isUser.generatePasswordResetToken()
    console.log("resetToken",resetToken)
    await isUser.save()
    const resultUrl =`${process.env.CLIENT_URL}/resetPassword/${resetToken}`
    const body =forgetPasswordEmailTemplate(resultUrl)
    try {
        await sendEmail({
            customerEmail,
            subject:"Bagan Hotel Forget Password",
            body
        })
        return true
    }catch (err:any){
        isUser.resetPasswordToken=undefined
        isUser.restPasswordExpire=undefined
        await isUser.save()
        throw new Error(err)
    }

})

export const resetPasswordByToken =errorHandler(async (token:string,newPassword:string)=>{
    const hashedToken = hashResetToken(token)
    const isUser =await User.findOne({
        resetPasswordToken:hashedToken,
        restPasswordExpire:{$gt:Date.now()}
    })
    if (!isUser)throw new Error("invalid or expired token")

    isUser.password = newPassword
    isUser.resetPasswordToken=undefined;
    isUser.restPasswordExpire=undefined;
    await isUser.save()
    return true;
})