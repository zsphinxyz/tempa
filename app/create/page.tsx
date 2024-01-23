import CreateForm from "@/components/CreateForm";
import { authOptions } from "@/option";
import { getServerSession } from "next-auth";


export default async function Create() {
    const session = await getServerSession(authOptions)
    return(
        <div className="">
            <h1 className="text-xl text-foreground text-center">Create</h1>

           <CreateForm session={session} />

        </div>
    )
}