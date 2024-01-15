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
        session && (
          <>
            {/* <Image src={session.user?.image!} alt={session.user?.name!} width={100} height={100} priority className='rounded-full border-2 border-white'/> */}
            {/* <Link href='/user'>Go To Profile Page</Link> */}
          </>
        )
      }
    </main>
  )
}
