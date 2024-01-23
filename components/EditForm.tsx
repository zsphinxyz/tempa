"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Suspense, useEffect, useState } from "react"
import Tags from "./Tags"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { db } from "@/firebase"
import { useRouter } from "next/navigation"
import DropImg from "./DropImg"
import { DocumentData } from "firebase-admin/firestore"

// ----------------------------------------------------------------------------------------------

const formSchema = z.object({
  name: z.string().min(5, {
    message: "Username must be at least 5 characters.",
  }),
  dob: z.string(),
  email: z.string().email(),
  phone: z.string(),
  gender: z.string(),
  tag: z.string().optional(),
})

export default function EditForm({session, temp}:{session:any, temp:any}) {
    const router = useRouter()
    const [userData, setUserData] = useState<DocumentData>({})
    // console.log('userdata', userData)
    // console.log('temp', temp)

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: temp && temp.name || session.user.name || '',
      email: temp && temp.email || session.user.email || '',
      dob: temp && temp.dob,
      gender: temp && temp.gender,
      phone: temp && temp.phone,
      tag: temp && temp.tag
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    saveToDb(values)
    router.push('/profile')
    // console.log(values)
  }

  
  const readData = async () => {
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
      readData();
  }, [userData])


  const saveToDb = async (values:any) => {
    try {
        const docRef = await setDoc(doc(db, "profile", session.user.id), {...values, loginEmail: session.user.email, emailName: session.user.name});
        // console.log("Document written with ID: ", docRef);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
}

  return (
    <Suspense fallback={<h1 className="text-5xl text-center font-bold">Loading...</h1>}>
    <section>
      <Card className="max-w-[420px] mx-auto">
        <CardHeader>
          <CardTitle>Edit Your Profile</CardTitle>
          <CardDescription>We prefer you to add accurately because the employers will choose candidates according to your profile.</CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1">

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                   <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                   <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Enter your Email ..." {...field}  />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dob"
                render={({ field }) => (
                   <FormItem>
                    <FormLabel>Date of Birth</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                   <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <FormControl>
                        <Select onValueChange={field.onChange}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Gender" />
                            </SelectTrigger>
                            <SelectContent {...field}>
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                                {/* <SelectItem value="system">Other</SelectItem> */}
                            </SelectContent>
                        </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                   <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="Enter your Phone Number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Tags form={form}/>

              <Button type="submit">Submit</Button>
              
            </form>
          </Form>
          <DropImg />
        </CardContent>

        <CardFooter>Footer</CardFooter>
      </Card>
    </section>
    </Suspense>
    
  )
}
