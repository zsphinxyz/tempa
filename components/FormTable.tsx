"use client"

import { db } from "@/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Session } from "next-auth";
import { useEffect, useState } from "react";

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

export default function FormTable({session}:{session:Session}) {
    const [userData, setUserData] = useState<DocumentData>({
        name: '',
        email: '',
        dob: '',
        gender: '',
        phone: '',
        tag: '',
    })
    const router = useRouter()

    const updataData =async () => {
        const docRef = doc(db, 'profile', session.user.id)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
            // console.log("Document data:", docSnap.data());
            setUserData(docSnap.data())
          } else {
            // docSnap.data() will be undefined in this case
            // console.log("No such document!");
          }
    }

    useEffect( () => {
        updataData();
    }, [])


    return(
        <div className="my-5">
            <Card>
                <CardHeader>
                    <CardTitle>
                        <div className="flex gap-3 items-center justify-center sm:justify-normal flex-wrap">
                            <Avatar>
                            <AvatarImage src={session.user.image!}
                            alt={session.user.name!}
                            width={100} height={100} 
                            className="border-muted-foreground rounded-md block"
                            />
                            <AvatarFallback className="w-[40px] flex items-center justify-center font-bold text-xl h-[40px] bg-background">{session.user.name[0]}</AvatarFallback>
                            </Avatar>

                            <div className="space-y-2">
                                <p className="text-primary text-xl sm:text-3xl font-bold">{session.user.name}</p>
                                <p className="text-muted-foreground text-[16px] sm:text-lg font-normal">{session.user.email}</p>
                            </div>
                        </div>
                    </CardTitle>

                    <CardDescription className="text-lg">
                        Bio
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <Table className="w-fit text-[16px] md:text-lg">

                        <TableBody>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>{userData.name}</TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell>Email</TableCell>
                                <TableCell>{userData.email}</TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell>Bod</TableCell>
                                <TableCell>{userData.dob}</TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell>Gender</TableCell>
                                <TableCell>{userData.gender}</TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell>Phone</TableCell>
                                <TableCell>{userData.phone}</TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell>tags</TableCell>
                                <TableCell className="flex gap-1 flex-wrap">{userData.tag.split(',').map((i:any) => (<span key={i} className="bg-muted mr-2 rounded-full text-sm px-2 py-1">{i}</span>) )}</TableCell>
                            </TableRow>

                        </TableBody>
                    </Table>
                </CardContent>

                <CardFooter className="">
                        <Button variant="default" onClick={() => router.push('/profile/edit')}>Edit</Button>
                </CardFooter>
            </Card>



        </div>
    )
}