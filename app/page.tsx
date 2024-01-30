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
import { FaGlobeAmericas } from 'react-icons/fa'
import { MdPeople } from 'react-icons/md'


export default async function Home() {
  let posts:any = [];
  const session = await getServerSession(authOptions);

  const querySnapshot = await getDocs(query(collection(db, 'posts'), orderBy('createdAt', 'desc')));
  querySnapshot.forEach( (doc) => {
    posts.push(doc.data())
  })

  return (
    <main>
      {
        session ? 
        <>

          <section className='flex gap-5 flex-col w-5/6 mx-auto '>
            {
              posts.map((post:any, i:number) => (
                  <Card key={i} className="hover:bg-muted/20 active:bg-muted/50">
                    <CardHeader>
                      <CardTitle>
                        {post.header}
                      </CardTitle>
                      <CardDescription>
                        {post.createdAt.toDate().toDateString()}
                        {post.isPublic ? <FaGlobeAmericas className="inline ml-2"/>: <MdPeople className="inline ml-2"/>}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className='tracking-tight leading-tight'>{post.desc}</p>
                    </CardContent>
                    <CardFooter>
                      <p>by {post.by}</p>
                    </CardFooter>
                  </Card>
              ))
            }
          </section>

        </>
        :
        <>
          <section className='flex gap-5 flex-col w-5/6 mx-auto '>
            <div className='text-center bg-destructive text-muted-foreground text-white py-1 mb-5 italic'>Login to view exclusive contents and to post in our platform</div>
            {
              posts.map( (post:any, i:number) => (
                post.isPublic ?
                  <Card key={i} className="hover:bg-muted/20 active:bg-muted/50">
                    <CardHeader>
                      <CardTitle>{post.header}</CardTitle>
                      <CardDescription>
                        {post.createdAt.toDate().toDateString()}
                        <FaGlobeAmericas className="inline ml-2"/>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className='tracking-tight leading-tight'>{post.desc}</p>
                    </CardContent>
                    <CardFooter>
                      <p>by {post.by}</p>
                    </CardFooter>
                  </Card>
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
