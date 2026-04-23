"use server"
import { loginSchema } from "@/types/login-schema"
 import { actionClient } from "./safe-action"


 export const loginAction=actionClient
 .schema(loginSchema)
 .action(async({parsedInput:{email,password}})=>{
 
    console.log(email,password)
    return {
        success:{email,password}
    }
 })