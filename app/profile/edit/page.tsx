import EditForm from "@/components/EditForm";
import { db } from "@/firebase";
import { authOptions } from "@/option";
import { doc, getDoc } from "firebase/firestore";
import { getServerSession } from "next-auth";

export default async function Edit() {

  const session = await getServerSession(authOptions);


  const readData = async () => {
    const docRef = doc(db, 'profile', session?.user.id)
    const docSnap = await getDoc(docRef)


    if (docSnap.exists()) {
        // console.log("Document data:", docSnap.data());
        return(docSnap.data())
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }

  }

  const tempData = await readData();
  // console.log(tempData)

  return(
    <EditForm session={session} temp={tempData}/>
  )
}