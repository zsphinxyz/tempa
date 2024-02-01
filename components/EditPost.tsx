'use client'

import { Button } from "@/components/ui/button"
import { Timestamp, setDoc, doc } from "firebase/firestore"; 
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { db } from "@/firebase";
import { useState } from "react";
import { DocumentData } from "firebase-admin/firestore";
import { useRouter } from "next/navigation";
import { useToast } from "./ui/use-toast";

// @ts-ignore 
export default function EditPost({id, header, desc, isPublic}) {
    const [post, setPost] = useState<DocumentData>({
        header: header,
        desc: desc,
        isPublic: isPublic ? true : false,
        bymail: 'mydummymail.56@gmail.com',
        by: 'D Mail',
        createdAt: Timestamp.now(),
    })
    const router = useRouter()
    const {toast} = useToast()
    
    async function SaveToDb() {
        try {
            await setDoc(doc(db, "posts", id), post, {merge: true});

        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    const handleSubmit = () => {
        SaveToDb()
        router.push('/profile')
        toast({
            title: 'Updated Seccessfully',
            description: `Your post can be seen by ${post.isPublic ? 'anyone' : 'our users'}`
        })
    }

    return(
        <Card className="w-9/12 mx-auto">

        <CardHeader>
            <CardTitle>Post it here</CardTitle>
            <CardDescription>Your post Description</CardDescription>
        </CardHeader>

        <CardContent>
            <Label htmlFor="header">Header</Label>
            <Input placeholder="Enter your Header..." id="header" defaultValue={post.header}  autoFocus={true} className="mb-5" onChange={(e) => setPost( pre => ({...pre, header:e.target.value}) ) } />

            <Label htmlFor="content">Content</Label>
            <Textarea placeholder="Enter your Content..." id="content" defaultValue={post.desc}  onChange={ e => setPost( pre => ({...pre, desc: e.target.value}) ) }/>

            <div className="flex items-center mt-5 gap-2">
                <Input type="checkbox" id="public" defaultChecked={post.isPublic} onChange={(e) => setPost( pre => ({...pre, isPublic: e.target.checked}) )} className="w-4 h-4"/>
                <Label htmlFor="public" className="text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">public</Label>
            </div>
            
            <Button className="mx-auto px-10 block my-5" onClick={handleSubmit}>Submit</Button>
        </CardContent>

        <CardFooter>
            <p>Your post is set to <i>{post.isPublic ? 'Public' : 'Private'}</i></p>
        </CardFooter>
    </Card>
    )
}