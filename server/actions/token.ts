"use server"

import { email } from "zod";
import { db } from "..";
import { emailVerificationToken, users } from "../schema";
import { eq } from "drizzle-orm";
import { error } from "console";

//today notion
const checkEmailVerificationToken=async (email:string | null ,token?:string)=>{
    
    try {
        let vToken:{
        id:string,
        email:string,
        token:string,
        expires:Date,
    }  | undefined
        if(email){
         vToken= await db.query.emailVerificationToken.findFirst({where: eq(emailVerificationToken.email,email)})

        }

        if(token){
                     vToken= await db.query.emailVerificationToken.findFirst({where: eq(emailVerificationToken.token,token)})

        }
         
        return vToken;
    } catch (error) {
         return null
    }
}

//today notion
export const generateEmailVerificationToken= async (email:string)=>{

    const token=crypto.randomUUID();
    
    const expires=new Date(new Date().getTime() + 30 * 60 * 1000);

    const existingToken= await checkEmailVerificationToken(email);

    if(existingToken){
        await db.delete(emailVerificationToken).where(eq(emailVerificationToken.id,existingToken.id))
    }

    const verificationToken= await db.insert(emailVerificationToken).values({
        email,
        token,
        expires,
    }).returning()

    return verificationToken

    
}



export const confirmEmailToken= async (token:string)=>{


    const hasToken= await checkEmailVerificationToken(null,token);
    if(!hasToken) return {error:"No Token"}

    const isExpired= new Date() > new Date(hasToken.expires);
    if(!isExpired) return {error:"Token is expired"};

    const confirmUser= await db.query.users.findFirst({where:eq(users.email,hasToken.email)})
    if(!confirmUser) return {error:"No user found"};

    await db.update(users).set({
        emailVerified:new Date(),
        email:confirmUser.email,
    }).where(eq(users.id,confirmUser.id))

    await db.delete(emailVerificationToken).where(eq(emailVerificationToken.id,hasToken.id))

    return {success:"Email verified"}

}
