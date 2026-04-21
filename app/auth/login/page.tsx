import AuthForm from '@/app/components/auth/auth-form'
import React from 'react'

const Login = () => {
  return (
   <AuthForm formTitle='Log in to your account' footerHerf='/auth/register' footerLabel="Don't have an accouont"
   showProvider={true}>
    <h2>Login Form</h2>
   </AuthForm>
  )
}

export default Login