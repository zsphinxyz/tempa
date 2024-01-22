import LoginBtn from '../components/LoginBtn'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/option'
import Image from 'next/image'
import Link from 'next/link'
import Nav from '../components/Nav'

export default async function Home() {
  const session = await getServerSession(authOptions)
  return (
    <main>
      {
        session ? 
        <>
            Logged in
        </>
        :
        <>
          <div className='text-center bg-destructive text-muted-foreground text-white py-1 italic'>You are not currently logged in. To view to our exclusive contents logged in.</div>
        </>
      }
    </main>
  )
}
