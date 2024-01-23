import { getServerSession } from 'next-auth'
import { authOptions } from '@/option'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { db } from '@/firebase'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


export default async function Home() {
  let posts:any = []
  const session = await getServerSession(authOptions)

  const querySnapshot = await getDocs(query(collection(db, 'posts'), orderBy('createdAt', 'desc')));
  querySnapshot.forEach( (doc) => {
      posts.push(doc.data())
  })

  return (
    <main>
      {
        session ? 
        <>

          <main className='flex gap-5 flex-col w-5/6 mx-auto '>
            {
              posts.map( (post:any, i:number) => (
                <Card key={i}>
                  <CardHeader>
                    <CardTitle>{post.header}</CardTitle>
                    <CardDescription>{post.createdAt.toDate().toDateString()}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>{post.desc}</p>
                  </CardContent>
                  <CardFooter>
                    <p>by {post.by}</p>
                  </CardFooter>
                </Card>
              ))
            }
          </main>

        </>
        :
        <>
          <section className='flex gap-5 flex-col w-5/6 mx-auto '>
            <div className='text-center bg-destructive text-muted-foreground text-white py-1 mb-5 italic'>Login to view exclusive contents and to post in our platform</div>
            {
              posts.map( (post:any) => (
                post.isPublic ?
                  <div className='border border-muted-foreground w-full p-2 rounded-md'>
                    <h1>{post.header}</h1>
                    <h1>{post.desc}</h1>
                    <h1>by {post.by}</h1>
                  </div>
                :
                null
              ))
            }
          </section>
        </>
      }
    </main>
  )
}
