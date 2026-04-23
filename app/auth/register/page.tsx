"use client"
import AuthForm from '@/app/components/auth/auth-form'
import { registerSchema } from '@/types/register-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import {useForm} from 'react-hook-form'
import * as z from 'zod'
import Link from 'next/link';
import {useAction} from 'next-safe-action/hooks'
import { registerAction } from '@/server/actions/register-action';
const Register = () => {
  const{register,handleSubmit,formState:{errors}} =useForm<z.infer<typeof registerSchema>>({
    resolver:zodResolver(registerSchema),
    defaultValues:{
      name:"",
      email:"",
      password:"",
    }
  });

  
const {execute,status,result}=useAction(registerAction)
  const onSubmit=(data:z.infer<typeof registerSchema>)=>{
  const {name,email,password}=data
   execute({name,email,password})

  }
  return (
   <AuthForm formTitle='Register new account' footerLabel='Already have an account' footerHerf='/auth/login' showProvider>
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        
  {/* Username Field */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Name</label>
          <input 
            {...register("name")}
            placeholder="Zay Yar Lin Tun" 
            className="border rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
        </div>

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
        <div className='flex flex-col gap-3 '>
          <Link className='w-full text-blue-600 hover:underline ' href={"/auth/reset"}>Forgot Password?</Link>

        <button 
          type="submit" 
          className={`w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition font-medium ${status === 'executing' && "animate-pulse"}`}
        > 
        Register
        </button>
        </div>

      </form>
   </AuthForm>
  )
}

export default Register