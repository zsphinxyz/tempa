"use client"

import { db } from "@/firebase";
import { collection, doc, getDoc, getDocs, orderBy, query, where } from "firebase/firestore";
import { Session } from "next-auth";
import { useEffect, useState } from "react";
import { FaCalendar, FaQuestion } from "react-icons/fa";
import { MdMail } from "react-icons/md";
import { IoMdFemale, IoMdMale, IoMdCall } from "react-icons/io";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { DocumentData } from "firebase-admin/firestore";
import Link from "next/link";

export default function FormTable({session}:{session:Session}) {
    const [userData, setUserData] = useState<DocumentData>({
        name: session.user.name || '',
        email: session.user.email || '',
        dob: '',
        gender: '',
        phone: '',
        tag: '',
    })
    // , 
    const router = useRouter()

    const [posts, setPosts] = useState<any>()
    const getData = async () => {
        let posts:any = []
        const querySnapshot = await getDocs(query(collection(db, 'posts'), orderBy('createdAt', 'desc'), where('by', '==', userData.name)));
        querySnapshot.forEach( (doc) => {
            posts.push(doc.data())
        })
        setPosts(posts)
    }

    console.log(posts)

    const updataData = async () => {
        const docRef = doc(db, 'profile', session.user.id)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
            // console.log("Document data:", docSnap.data());
            setUserData(docSnap.data())
          } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
          }
    }

    useEffect( () => {
        getData();
        updataData();
    }, [])

    return(
        <div className="my-5">
            <Card className="w-11/12 mx-auto">
                <CardHeader>
                    <CardTitle className="mb-3">
                        <div className="flex gap-3 items-center justify-center sm:justify-normal flex-wrap">
                            <Avatar className="relative">
                                <AvatarImage src={session.user.image!}
                                alt={session.user.name!}
                                width={100} height={100} 
                                className="border-muted-foreground rounded-full block"
                                />
                                <AvatarFallback className="w-[40px] flex items-center justify-center font-bold text-xl h-[40px] bg-background">{session.user.name[0]}</AvatarFallback>
                                <div className="absolute bottom-0 right-0 bg-white border border-foreground rounded-full w-7 h-7 flex items-center justify-center">
                                    {
                                        userData.gender == 'male' ?
                                            <IoMdMale className="text-2xl inline text-green-500" /> :
                                        userData.gender = 'female' ?
                                            <IoMdFemale className="text-2xl inline text-green-500" /> :
                                            <FaQuestion className="text-2xl inline " /> 
                                    }
                                </div>
                            </Avatar>

                            <div className="space-y-2">
                                <p className="text-primary text-xl sm:text-3xl font-bold">
                                    {userData.name || session.user.name}
                                    <span className="text-muted-foreground/90 text-lg"> @{session.user.name} </span>
                                </p>
                                <p className="text-muted-foreground text-[16px] sm:text-lg font-normal">
                                        <MdMail className="inline ml-2 mr-1" />{userData.mail || session.user.email}    
                                </p>
                                <p className="text-muted-foreground text-[16px] sm:text-lg font-normal">         
                                    <FaCalendar className="inline ml-2 mr-1" />{userData.dob} •
                                    {
                                        userData.phone &&
                                       <><IoMdCall className="inline ml-3 "/> {userData.phone}</> 
                                    }
                                </p>
                            </div>
                        </div>
                    </CardTitle>

                    <CardDescription className="text-lg">
                    {userData.tag && userData.tag.split(',').map((i:any) => (<span key={i} className="bg-muted hover:bg-muted-foreground/30 transition cursor-default mr-2 rounded-full text-sm px-2 py-1">{i}</span>) )}
                    <Button variant="ghost" onClick={() => router.push('/profile/edit')} className="block w-full my-2 text-center mx-auto bg-muted-foreground/10">Edit Profile</Button>
                    
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    { posts && 
                        posts.map((post: any, i: number) => (
                            <Card key={i} className="my-2 hover:bg-muted/20 active:bg-muted/50">
                                <CardHeader>
                                    <CardTitle className="flex justify-between">
                                        {post.header}
                                            <DropdownMenu>
                                                <DropdownMenuTrigger>...</DropdownMenuTrigger>
                                                <DropdownMenuContent>
                                                    <DropdownMenuItem><Link href='/edit'>Edit</Link></DropdownMenuItem>
                                                    <DropdownMenuItem>Delete</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                    </CardTitle>
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
                </CardContent>

                <CardFooter className="">
                        {/* <Button variant="default" onClick={() => router.push('/profile/edit')}>Edit</Button> */}
                </CardFooter>
            </Card>



        </div>
    )
}