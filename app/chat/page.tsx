import { db } from "@/firebase";
import { doc, setDoc, collection, getDocs } from "firebase/firestore";
import { revalidatePath } from "next/cache";

import ChatForm from "./form";
import { MdDelete } from "react-icons/md";
import DeleteBtn from "./deleteBtn";


type msgData = {
    atDate: string;
    msg: string;
}

export default async function page() {
    const specialWords = ['zsphinx', 'z', 'thiha', 'z_sphinx', 'sphinx', 'sthl', 'z sphinx']

    const formAction = async (formData: FormData) => {
        'use server'
        const msg = formData.get('msg') as string;
        const atDate = Date.now().toString();
        msg && await setDoc(doc(db, 'chat', atDate), { msg: msg, atDate: atDate })
        revalidatePath('/')
    }

    const query = await getDocs(collection(db, 'chat'));
    let dataArray: any = [];

    query.forEach((doc) => {
        dataArray = [...dataArray, doc.data()]
    })

    let date: Date = new Date();




    return (
        <main className="min-h-[85vh] flex justify-between flex-col">
            <section className=" w-11/12 mx-auto border border-muted rounded-lg flex-col h-32 flex flex-grow gap-2 min-h-full bg-muted p-3 overflow-y-scroll">

                {
                    dataArray.map((i: msgData) => {

                        let dbDate = new Date(parseInt(i.atDate));
                        let isDate = false;

                        if (date.getDate() == dbDate.getDate()) {
                            isDate = false
                        }
                        else {
                            isDate = true
                            date = dbDate;
                        }

                        return (
                            <div key={i.atDate} className="space-y-1">
                                {isDate &&
                                    <p className="text-center text-xs text-muted-foreground/50 pointer-events-none select-none">{date.toLocaleDateString('en-us', { weekday: "short" })} {date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()} </p>
                                }
                                <div className='flex gap-2 items-center group w-fit'>
                                    <p className={`bg-background/80 block h-fit w-fit px-3 py-1 rounded-full hover:brightness-125 select-none ${specialWords.includes(i.msg.trim().toLowerCase()) && 'bg-green-400'}`}>
                                        {i.msg}
                                    </p>
                                    {/* <button className="opacity-0 group-hover:opacity-100 delay-200 block self-center" onClick={handleDelete(i.atDate)}>
                                        <MdDelete className="text-red-500" />
                                    </button> */}

                                    <DeleteBtn id={i.atDate} />
                                    
                                </div>

                            </div>
                        )
                    })
                }

            </section>

            <div className="w-11/12 mx-auto flex items-center">
                <ChatForm formAction={formAction} />
            </div>

        </main>
    )
}

