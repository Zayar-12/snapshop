"use server"
import { registerSchema } from "@/types/register-schema"
import { actionClient } from "./safe-action"
import bcrypt from 'bcrypt'
import { db } from ".."
import { eq } from "drizzle-orm"
import { users } from "../schema"
import { generateEmailVerificationToken } from "./token"
import { sendEmail } from "./email"

export const registerAction= actionClient.
schema(registerSchema).
action(async({parsedInput:{name,email,password}})=>{

   const hashedPassword=await bcrypt.hash(password,10);
   console.log(hashedPassword)

   //checkUser

   const existingUser= await db.query.users.findFirst({
    where:eq(users.email,email)
   })
   
   if(existingUser){

    if(!existingUser.emailVerified){
        //send verfication
        const verificationToken= await generateEmailVerificationToken(email)
try {
   await sendEmail(verificationToken[0].email, verificationToken[0].token, name.slice(0, 5));
} catch (e) {
   console.log("Email error logic:", e);
   // email ပို့တာ မှားနေရင်တောင် အောက်က return ကို ဆက်သွားစေချင်ရင် ဒီမှာ catch လုပ်ထားလို့ရတယ်
}
        return {success:"Email verification resent to your account"}
    }
    
    return {error:"Email already exist"}
   }

   //create user
   await db.insert(users).values(
   { name,
    email,
    password:hashedPassword,}
   )

   //sent verification email
        const verificationToken= await generateEmailVerificationToken(email)

// register-action.ts ထဲမှာ
try {
   await sendEmail(verificationToken[0].email, verificationToken[0].token, name.slice(0, 5));
} catch (e) {
   console.log("Email error logic:", e);
   // email ပို့တာ မှားနေရင်တောင် အောက်က return ကို ဆက်သွားစေချင်ရင် ဒီမှာ catch လုပ်ထားလို့ရတယ်
}

return { success: "Email verification sent to your account" };
  


})