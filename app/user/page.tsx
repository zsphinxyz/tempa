import { authOptions } from '@/option'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import React from 'react'

const User = async() => {
  const session = await getServerSession(authOptions);
  if (session !== null) {
    return (
        <section className='mx-10 my-5'>
            <header className='flex items-center'>
              <Image src={session.user?.image!} alt={session.user?.name!} width={100} height={100} priority className=''/>
              <div className="ml-3">
                <h1 className="text-3xl font-bold ">{session.user?.name}</h1>
                <h2 className='block text-lg text-sky-500'>{session.user?.email}</h2>
              </div>
            </header>

        </section>
    )
  }
  
}

export default User