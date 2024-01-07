'use client'

import { Session } from "next-auth"
import { signIn, signOut } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

const LoginBtn = ({session, className}:{session:Session | null, className?:string}) => {
  const [profileClick, setProfileClick] = useState(false)
    
  return (
    <>
    {
        !session ?
        <button
            className={`text-bold bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 ${className}`}
            onClick={() => signIn()}
        >
        Login
        </button>
        :
        <div className={`${className} relative`}>
          <Image 
            src={session?.user?.image!} 
            alt='profile' 
            width={40} 
            height={40} 
            className="rounded-full border-2 mr-14 border-slate-200 cursor-pointer" 
            onClick={() => {setProfileClick(!profileClick)}}
          />
          <ul className={`absolute right-1 top-12 bg-slate-600 w-32 flex gap-3 flex-col text-center pb-2 rounded-b-lg ${!profileClick && 'hidden'}`}>
            <Link href="/user" className="hover:bg-slate-500"><li className="py-1 text-lg text-slate-200">Profile</li></Link>
            <Link href="/" className="hover:bg-slate-500"><li className="py-1 text-lg text-slate-200">About</li></Link>
            <Link href="/" className="hover:bg-slate-500"><li className="py-1 text-lg text-slate-200">Contact</li></Link>
            <Link href="/" className="hover:bg-slate-500"><li className="py-1 text-lg text-slate-200">Setting</li></Link>
            <Link href="/" className="hover:bg-slate-500"><li className="py-1 text-lg text-slate-200">Security</li></Link>
            <Link href="/" className="hover:bg-slate-500"><li className="py-1 text-lg text-slate-200" onClick={()=> signOut()}>Log Out</li></Link>
          </ul>

          {/* <button
              className={`text-bold bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 `}
              onClick={() => signOut()}
          >
          Log Out
          </button> */}

        </div>
    }

    </>
  )

}

export default LoginBtn