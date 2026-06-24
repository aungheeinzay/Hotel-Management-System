import {z} from "zod";


export const RegisterSchema = z.object({
    username:z.string().nonempty(),
    email:z.string().email().nonempty(),
    password:z.string().min(6,"password must be at least 6 characters")
})

export type RegisterSchemaForm =z.infer<typeof RegisterSchema>

export const LoginSchema = z.object({
    email:z.string().email("enter correct email"),
    password:z.string().nonempty("password is required")
})

export type LoginSchemaForm = z.infer<typeof LoginSchema>

export const userNameEmailSchema =z.object({
    username:z.string().nonempty(),
    email:z.string().email("enter correct email")
})
export type userNameEmailForm = z.infer<typeof userNameEmailSchema>

export const updatePasswordSchema = z.object({
    oldPassword:z.string().min(0,"password must have 6char"),
    newPassword:z.string().min(6,"password too shoty"),
    conformPassword:z.string().nonempty()
}).refine((data)=>data.newPassword===data.conformPassword,{
    error:"Password must match",
    path:["conformPassword"]
})

export type updatePasswordSchemaForm =z.infer<typeof updatePasswordSchema>

export const forgetPasswordSchema =z.object({
    email:z.string().email("enter correct email")
})
export type forgetPasswordForm = z.infer<typeof forgetPasswordSchema>

export const resetPasswordSchema = z.object({
    newPassword:z.string().min(6,"password must be at least 6 characters"),
    conformPassword:z.string()
}).refine((data)=>data.newPassword===data.conformPassword,{
    error:"Password must match",
    path:["conformPassword"]
})

export type resetPasswordForm = z.infer<typeof resetPasswordSchema>