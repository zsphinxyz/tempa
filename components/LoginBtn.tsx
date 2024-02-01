'use client'

import { Session } from "next-auth"
import { signIn, signOut } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import {collection, addDoc, setDoc, doc} from 'firebase/firestore'
import { db } from "@/firebase"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const LoginBtn = ({session, className}:{session:Session | null, className?:string}) => {
  const router = useRouter();
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
            <DropdownMenu >
              <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarImage src={session.user.image!}
                      alt={session.user.name!}
                      width={40} height={40} 
                      className="rounded-full border-2 border-muted-foreground cursor-pointer"
                    />
                    <AvatarFallback className="w-[40px] flex items-center justify-center font-bold text-xl h-[40px] bg-background rounded-full cursor-pointer mr-5 border-2">{session.user.name[0]}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>

              <DropdownMenuContent>
                  <DropdownMenuLabel>Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  <DropdownMenuGroup  className="space-y-3 cursor-default">
                    <DropdownMenuItem>
                      <Link href="/profile" className="w-full">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem disabled><Link href="#">About</Link></DropdownMenuItem>
                    <DropdownMenuItem disabled><Link href="#">Setting</Link></DropdownMenuItem>
                    <DropdownMenuItem>
                    <Link href="/" onClick={()=> logout()} className="w-full">Log Out</Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
    }    
    </>
  )

}

export default LoginBtn