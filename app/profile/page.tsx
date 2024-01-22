import Table from '@/components/FormTable'
import { authOptions } from '@/option'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import React, { Suspense } from 'react'

const User = async ({params}:any) => {
  const session = await getServerSession(authOptions);
  
  if (session !== null) {
    return (
      <Suspense fallback={<h1 className='text-white text-4xl text-center'>Loading....</h1>}>
        <section>
            {/* <header className='flex items-center'>
              <Image src={session.user?.image!} alt={session.user?.name!} width={100} height={100} priority className='rounded-sm'/>
              <div className="ml-3">
                <h1 className="text-3xl font-bold ">{session.user?.name}</h1>
                <h2 className='block text-lg text-zinc-500'>{session.user?.email}</h2>
              </div>
            </header> */}
            
            <Table session={session} />
        </section>
      </Suspense>
    )
  }
  
}

export default User