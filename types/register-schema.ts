import * as z from 'zod'

export const registerSchema= z.object({
    username:z.string({
        message:"Please enter the username"
    }),
    email:z.string().email({
        message:"Please enter the valid email"
    }),
    password:z.string().min(4,{
        message:"Please enter the valid password"
    }

    ),
    code:z.string().optional()
})