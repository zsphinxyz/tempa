"use client"

import { db } from "@/firebase";
import { collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, where } from "firebase/firestore";
import { Session } from "next-auth";
import { useEffect, useState } from "react";
import { FaCalendar, FaGlobeAmericas, FaQuestion } from "react-icons/fa";
import { MdMail, MdPeople } from "react-icons/md";
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
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
  
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

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

        //get data for posts 
    const getData = async () => {
        let posts:any = []
        const querySnapshot = await getDocs(query(collection(db, 'posts'), orderBy('createdAt', 'desc'), where('bymail', '==', userData.email)));
        querySnapshot.forEach( (doc) => {
            posts.push({...doc.data(), id:doc.id})
        })
        setPosts(posts)
    }
    console.log(posts)

        // update data for user
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

    const handleDbDelete = async (id:string) => {
        await deleteDoc(doc(db, "posts", (id)))
        await getData()
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
                                                    
                                                    {/* <DropdownMenuItem> */}
                                                        <div className="px-2 text-[14px] hover:bg-muted">
                                                        <AlertDialog>
                                                            <AlertDialogTrigger>Delete</AlertDialogTrigger>
                                                            <AlertDialogContent>
                                                                <AlertDialogHeader>
                                                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                                    <AlertDialogDescription>
                                                                        This action cannot be undone. This will permanently delete this post
                                                                        and remove from our database.
                                                                    </AlertDialogDescription>
                                                                </AlertDialogHeader>
                                                                <AlertDialogFooter>
                                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                    <AlertDialogAction onClick={() => handleDbDelete(post.id)}>Continue</AlertDialogAction>
                                                                </AlertDialogFooter>
                                                            </AlertDialogContent>
                                                        </AlertDialog>
                                                        </div>
                                                    {/* </DropdownMenuItem> */}

                                                </DropdownMenuContent>
                                            </DropdownMenu>
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
                </CardContent>

                <CardFooter className="">
                        {/* <Button variant="default" onClick={() => router.push('/profile/edit')}>Edit</Button> */}
                </CardFooter>
            </Card>



        </div>
    )
}