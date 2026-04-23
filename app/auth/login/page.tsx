"use client"
import AuthForm from '@/app/components/auth/auth-form'
import { loginSchema } from '@/types/login-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import React from 'react'
import {useForm} from 'react-hook-form' 
import * as z from 'zod'
const Login = () => {
  const {register,handleSubmit,formState:{errors}} =useForm<z.infer<typeof loginSchema>>({
    resolver:zodResolver(loginSchema),
    defaultValues:{
      email:"",
      password:"",
    }
  })

  const onSubmit=(data:z.infer<typeof loginSchema>)=>{
    console.log(data)
  }
  return (
   <AuthForm formTitle='Log in to your account' footerHerf='/auth/register' footerLabel="Don't have an accouont"
   showProvider={true}>
    
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        
        {/* Email Field */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Email Address</label>
          <input 
            {...register("email")}
            placeholder="example@gmail.com" 
            className="border rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
        </div>

        {/* Password Field */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Password</label>
          <input 
        
            {...register("password")}
            type="password"
              
            placeholder="******"
            className="border rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
        </div>
        <div className='flex flex-col gap-3'>
          <Link className='w-full text-blue-600 hover:underline ' href={""}>Forgot Password</Link>

        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition font-medium"
        >
          Login
        </button>
        </div>

      </form>
   </AuthForm>
  )
}

export default Login