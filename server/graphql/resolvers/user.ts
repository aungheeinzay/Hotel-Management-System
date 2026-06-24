import {
    forgetPassword,
    Login,
    registerUser, resetPasswordByToken,
    updatePassword,
    UpdateUserNameEmail,
    uploadAvator
} from "../../controller/user";
import type {UserType} from "../../lib/type";
import type {Response} from "express"

export const userResolvers ={
    Query: {
        currentUser: async (_: any, __: any, {user}: { user: any }) => {
            return user
        },
        logout:async(_:any,__:any,{res}:{res:Response})=>{
            res.cookie("token",null,{maxAge:0})
            return true
        }
    },
    Mutation:{
        register:async(_:any,{userInput}:{userInput:Pick<UserType, "username" | "email" | "password">})=>{
            return await registerUser(userInput)
        },
        login:async(_:any,{userInput}:{userInput:Pick<UserType,"email" | "password">},{res}:{res:Response})=>await Login(userInput,res),
        uploadAvatar:async(_:any,{image}:{image:string},{userId}:{userId:string})=> await uploadAvator(image,userId),
        updateProfile:async(_:any,{profileInput}:{profileInput:Partial<UserType>},{userId}:{userId:string})=>await UpdateUserNameEmail(profileInput,userId),
        updatePassword:async(_:any,{oldPassword,newPassword}:{oldPassword:string,newPassword:string},{userId}:{userId:string})=>await updatePassword(oldPassword,newPassword,userId),
        forgetPassword:async(_:any,{customerEmail}:{customerEmail:string})=>await forgetPassword(customerEmail),
        resetPassword:async(_:any,{token,newPassword}:{token:string,newPassword:string})=>await resetPasswordByToken(token,newPassword)
    }
}

