"use client"
import React, { useCallback, useEffect, useState } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'
import { confirmEmailToken } from '@/server/actions/token'
import AuthForm from '@/app/components/auth/auth-form'

const ConfirmEmailPage = () => {
    const token=useSearchParams().get("token");
    const router=useRouter();

    const [error,setError]=useState("");
    const[success,setSuccess]=useState("");
    const handleConfirmEmail=useCallback(()=>{
           
        if(!token){
            setError("No Token value included");
            return 
        };

        confirmEmailToken(token).then((res)=>{
            if(res.success) {
                setSuccess(res.success);
                router.push("/auth/login")
            }
            if(res.error){
                setError(res.error);

            }

        })
    },[])

    useEffect(()=>{
            handleConfirmEmail()
    },[])
  return (
   <AuthForm
            formTitle="Confirming your email"
            footerLabel="Back to Login"
            footerHerf="/auth/login"
            showProvider={false}
        >
            <div className="flex flex-col items-center justify-center w-full gap-4">
                {!success && !error && <p>Verifying your email...</p>}
                {success && <p className="text-emerald-500 bg-emerald-500/10 p-3 rounded-md">{success}</p>}
                {error && <p className="text-destructive bg-destructive/10 p-3 rounded-md text-red-500">{error}</p>}
            </div>
        </AuthForm>
  )
}

export default ConfirmEmailPage