"use server"
import { registerSchema } from "@/types/register-schema"
import { actionClient } from "./safe-action"

export const registerAction= actionClient.
schema(registerSchema).action(async({parsedInput:{name,email,password}})=>{

    console.log(name,email,password)
    return {
        success:{
            name,
            email,
            password
        }
    }
})