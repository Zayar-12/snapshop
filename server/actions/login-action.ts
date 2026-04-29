"use server"
import { loginSchema } from "@/types/login-schema"
 import { actionClient } from "./safe-action"
import { db } from ".."
import { eq } from "drizzle-orm"
import { users } from "../schema"
import { generateEmailVerificationToken } from "./token"
import { sendEmail } from "./email"
import { signIn } from "../auth"


 export const loginAction=actionClient
 .schema(loginSchema)
 .action(async({parsedInput:{email,password}})=>{
 
  try {
      const existingUser= await db.query.users.findFirst({where:eq(users.email,email)})

      if(existingUser?.email !== email){
        return {error:"Please enter the valid credentials"}
      }


       if(!existingUser.emailVerified){
        const verificationToken= await generateEmailVerificationToken(existingUser.email)
       await sendEmail(verificationToken[0].email, verificationToken[0].token, existingUser.name!.slice(0, 5));
       return {success:"Email verifiacton resent"}


       }

       await signIn("credentials",{email,password,redirectTo:"/"});
    return {success:"Login Successful"}
  } catch (error) {
     throw error
  }
   

   
 })