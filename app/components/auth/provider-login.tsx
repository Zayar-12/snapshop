"use client"
import React from 'react'
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaLeaf } from "react-icons/fa6";
import { signIn } from 'next-auth/react';
import { redirect } from 'next/dist/server/api-utils';
const ProviderLogin = () => {
  return (
    <div className='flex flex-col gap-2'>
      <button className='bg-white border-2 border-gray-400 py-2 px-4  text-black text-sm rounded-md flex items-center justify-center gap-3 hover:bg-zinc-100 transition-colors 
     font-medium' onClick={()=>signIn('google',{
      redirect:false,
     callbackUrl:"/"
     })}>Login with google<FcGoogle size={19} /></button>
      <button className='bg-white border-2 border-gray-400 py-2 px-4 text-sm rounded-md flex items-center justify-center gap-3 hover:bg-zinc-100 transition-colors
     font-medium ' onClick={()=>signIn('github',{
      redirect:false,
      callbackUrl:"/"
     })}>Login with github  <FaGithub  size={19}/></button>
  
    </div>
  )
}

export default ProviderLogin