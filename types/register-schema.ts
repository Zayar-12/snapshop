import * as z from 'zod'

export const registerSchema= z.object({
    name:z.string().min(4,{
        message:"Please enter the valid username"
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