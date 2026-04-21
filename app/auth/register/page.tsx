import AuthForm from '@/app/components/auth/auth-form'
import React from 'react'

const Register = () => {
  return (
   <AuthForm formTitle='Register new account' footerLabel='Already have an account' footerHerf='/auth/login' showProvider>
    <h2>Register form</h2>
   </AuthForm>
  )
}

export default Register