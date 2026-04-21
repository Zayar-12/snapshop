import Link from 'next/link'
import React from 'react'
interface AuthFooterProps{
    footerLabel:string,
    footerHerf:string,
}
const AuthFooter = ({footerHerf,footerLabel}:AuthFooterProps) => {
  return (
   <Link className='text-blue-600 text-md font-medium ' href={footerHerf}>{footerLabel}</Link>
  )
}

export default AuthFooter