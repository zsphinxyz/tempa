"use client"

import { db } from "@/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Session } from "next-auth";
import { useEffect, useState } from "react";
import { HiPencilSquare } from "react-icons/hi2";

// type TUserData = {
//     Name: string,
//     email: string,
//     age: string,
//     gender: string,
//     phone: string,
// }

export default function Table({session}:{session:Session}) {
    const [userData, setUserData] = useState<any>({
        Name: '',
        email: '',
        age: '',
        gender: '',
        phone: '',
        occupation: '',

    })
    const [edit, setEdit] = useState(false)

    const saveToDb = async () => {
        try {
            const docRef = await setDoc(doc(db, "profile", session.user.id), {...userData, loginEmail: session.user.email, emailName: session.user.name});
            // console.log("Document written with ID: ", docRef);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
    }

    const updataData =async () => {
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
        updataData();
    }, [])

    function handleSave() {
        setEdit(false)
        saveToDb();
        updataData();
    }

    return(
        <div className="my-5">
            <table className='cursor-default text-lg w-full text-left'>
                <tbody className={`[&>tr>td]:py-2 odd:[&>tr]:bg-neutral-300 [&>tr>td:nth-child(1)]:font-bold [&>tr>td]:px-5 even:[&>tr>*:empty]:border-b-2 even:[&>tr>*:empty]:border-b-red-500 odd:[&>tr>]:w-24 ${edit ? 'even:[&>tr>td]:border-l-2 even:[&>tr>td]:border-green-500 even:[&>tr>td]:text-slate-700 even:[&>tr>td:focus]:text-green-700' : ''}`}>

                    <tr>
                        <td>Name</td>
                        <td className="">
                            <input type="text" readOnly={!edit} value={userData.Name} className='bg-transparent outline-none block w-full' onChange={(e)=>( setUserData( (prev:any) => ( {...prev, Name: e.target.value} )) )}/>
                            {/* <HiPencilSquare size={20} className="opacity-0 cursor-pointer group-hover:opacity-100" /> */}
                        </td>
                    </tr>

                    <tr>
                        <td>Email</td>
                        <td>
                            <input type="text" readOnly={!edit} value={userData.email} className='bg-transparent outline-none block w-full' onChange={(e)=>( setUserData( (prev:any) => ( {...prev, email: e.target.value} )) )}/>
                        </td>
                    </tr>

                    <tr>
                        <td>Age</td>
                        <td>
                            <input type="number" readOnly={!edit} value={userData.age} className='bg-transparent outline-none block w-full' onChange={(e)=>( setUserData( (prev:any) => ( {...prev, age: e.target.value} )) )}/>
                        </td>
                    </tr>

                    <tr>
                        <td>Gender</td>
                        <td>
                            <select disabled={!edit}  onChange={(e)=>( setUserData( (prev:any) => ( {...prev, gender: e.target.value} )) )} className="disabled:text-black group text-black bg-transparent disabled:appearance-none">
                                <option value="Male" defaultValue='Male' className="appearance-none">Male </option>
                                <option value="Female" className="appearance-none">Female </option>
                            </select>
                        </td>
                    </tr>

                    <tr>
                        <td>Ph No.</td>
                        <td>
                            <input type="text" readOnly={!edit} value={userData.phone} className='bg-transparent outline-none block w-full' onChange={(e)=>( setUserData( (prev:any) => ( {...prev, phone: e.target.value} )) )}/>
                        </td>
                    </tr>

                    <tr>
                        <td>Occupation</td>
                        <td >
                            <input type="text" readOnly={!edit} value={userData.occupation} className='bg-transparent outline-none block w-full' onChange={(e)=>( setUserData( (prev:any) => ( {...prev, occupation: e.target.value} )) )}/>
                        </td>
                    </tr> 

                </tbody>
                <tfoot>
                    <tr>
                        <td className="" colSpan={2}>
                            {
                                edit ? 
                                <button className="bg-green-500 mx-auto block px-5 py-1 rounded-md hover:bg-green-600 font-bold mt-5" onClick={handleSave}>Save</button>:
                                <button className="bg-green-500 mx-auto block px-5 py-1 rounded-md hover:bg-green-600 font-bold mt-5" onClick={() => setEdit(true)}>Edit</button>
                            }
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}