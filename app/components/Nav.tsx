import { authOptions } from "@/option"
import { getServerSession } from "next-auth"
import LoginBtn from "./LoginBtn"

const Nav = async() => {
  const session = await getServerSession(authOptions)
    return(
        <nav className=" bg-slate-600 h-14 flex items-center ">
            <h1 className="text-3xl font-extrabold text-white mx-5 cursor-default">Temp</h1>
            <LoginBtn className="ml-auto" session={session} />

        </nav>
    )
}

export default Nav