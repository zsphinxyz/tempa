import CreateForm from "@/components/CreateForm";
import { authOptions } from "@/option";
import { getServerSession } from "next-auth";


export default async function Create() {
    const session = await getServerSession(authOptions)
    return(
        <div className="">
           <CreateForm session={session} />

        </div>
    )
}