
import { MdDelete } from "react-icons/md";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { revalidatePath } from "next/cache";

export default function DeleteBtn({id}:{id:string}) {

   async function handleDelete() {
    'use server'
        await deleteDoc(doc(db, "chat", id));
        revalidatePath('/')
    }

  return (
    <form action={handleDelete}>
        <button className="opacity-0 group-hover:opacity-100 delay-200 block self-center" type="submit">
            <MdDelete className="text-red-500" /> 
        </button>
    </form>
  )
}
