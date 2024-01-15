'use client'

import { Session } from "next-auth"
import { signIn, signOut } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import {collection, addDoc, setDoc, doc} from 'firebase/firestore'
import { db } from "@/firebase"

const LoginBtn = ({session, className}:{session:Session | null, className?:string}) => {
  const [profileClick, setProfileClick] = useState(false);
  const router = useRouter();

  /*
  
  useEffect(()=>{
    const saveInfo = async () => {
      try {
        await setDoc(doc(db, 'newUser', 'soeThiha'), {name:'thiha',age:22,male:true})
        const docRef = await addDoc(collection(db, 'users'), {
          name: session?.user?.name,
          email: session?.user?.email,
        })
        console.log(docRef.id) 
      } catch (error) {
        console.error(error)
      }
    }

    saveInfo();
  }, [])

  */

  const login = () => {
      signIn();


  }

  const logout = () => {
    router.push('/')
    signOut();
  }
    
  return (
    <>
    {
        !session ?
        <button
            className={`text-bold bg-green-500 text-white px-3 py-1 mr-2 md:mr-5 rounded-lg hover:bg-green-600 ${className}`}
            onClick={() => login()}
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
            className="rounded-full border-2 mr-5 md:mr-14 border-slate-200 cursor-pointer" 
            onClick={() => {setProfileClick(!profileClick)}}
            
          />
          <ul 
            className={`absolute right-0 top-12 bg-color1 w-32 flex gap-3 flex-col text-center pb-2 rounded-b-md shadow-lg text-black shadow-neutral-400 ${!profileClick && 'hidden'}`}
          >
            <Link href="/user" className="hover:bg-blue-500 hover:text-white transition"><li className="py-1 text-lg">Profile</li></Link>
            <Link href="/#" className="hover:bg-blue-500 hover:text-white transition"><li className="py-1 text-lg">About</li></Link>
            <Link href="/#" className="hover:bg-blue-500 hover:text-white transition"><li className="py-1 text-lg">Contact</li></Link>
            <Link href="/#" className="hover:bg-blue-500 hover:text-white transition"><li className="py-1 text-lg">Setting</li></Link>
            <Link href="#" className="hover:bg-blue-500 hover:text-white transition"><li className="py-1 text-lg">Security</li></Link>
            <Link href="/" className="hover:bg-blue-500 hover:text-white transition"><li className="py-1 text-lg" onClick={()=> logout()}>Log Out</li></Link>
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