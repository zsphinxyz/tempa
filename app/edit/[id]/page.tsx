import CreateForm from "@/components/CreateForm"
import { authOptions } from "@/option"
import { getServerSession } from "next-auth"
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";
import EditPost from "@/components/EditPost";

async function EditPage({params}: {params: {id: string}}) {
  // const session = await getServerSession(authOptions)

  async function getIdDoc() {
    const docRef = doc(db, "posts", params.id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // console.log("Document data:", docSnap.data());
      return(docSnap.data())

    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  }

  const dbpost = await getIdDoc();
  // console.log(post)

  return (
    <div>
      <EditPost id={params.id} header={dbpost?.header} desc={dbpost?.desc} isPublic={dbpost?.isPublic} />
    </div>
  )
}

export default EditPage