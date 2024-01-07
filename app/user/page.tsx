import { authOptions } from '@/option'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import React from 'react'

const User = async() => {
  const session = await getServerSession(authOptions);
  if (session !== null) {
    return (
        <section>
            <Image src={session.user?.image!} alt={session.user?.name!} width={50} height={50} priority className='rounded-full'/>
        </section>
    )
  }
  
}

export default User