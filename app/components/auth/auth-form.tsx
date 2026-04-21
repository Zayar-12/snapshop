import React from 'react'
import AuthFooter from './auth-footer'
import ProviderLogin from './provider-login'

interface AuthFormProps{
    children:React.ReactNode,
    formTitle:string,
    showProvider:boolean,
    footerLabel:string,
    footerHerf:string
}
const AuthForm = ({children,formTitle,showProvider,footerLabel,footerHerf}:AuthFormProps) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white text-gray-950 shadow-sm">
      
      {/* Card Header */}
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="text-2xl font-semibold leading-none tracking-tight">
          {formTitle}
        </h3>
      </div>
      
      {/* Card Content */}
      <div className="p-6 pt-0">
        {children}
      </div>
      
      {/* Card Footer */}
      <div className="flex flex-col gap-4 p-6 pt-0">
        {showProvider && <ProviderLogin />}
        <AuthFooter footerLabel={footerLabel} footerHerf={footerHerf} />
      </div>

    </div>
  )
}

export default AuthForm