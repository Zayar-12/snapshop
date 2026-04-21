
"use client"
import { Session } from 'next-auth'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

const UserButton = ({user}:Session) => {
  console.log(user)
  return (
    <div>{user?.email} {user?.email ? <button className='bg-red-600 py-2 px-4 text-sm rounded-md font-medium text-white' onClick={()=>signOut()}>Logout</button>:
    <Link  href={"/auth/login"}className='bg-blue-600 py-2 px-4 text-sm rounded-md
     font-medium text-white' >Log in</Link>} </div>
  )
}

export default UserButton