import * as z from "zod"

export const loginSchema=z.object({
    email:z.string().email({
        message:"Please enter the valid email"
    }),
    password:z.string().min(4,{
        message:"Please enter the valid password"
    }),
    code:z.string().optional(),
})