import { authOptions } from "@/option"
import { getServerSession } from "next-auth"
import LoginBtn from "./LoginBtn"
import { SiTemporal } from "react-icons/si";
import Link from "next/link";

const Nav = async() => {
  const session = await getServerSession(authOptions)
    return(
        <nav className="bg-color1 h-14 flex items-center ">
            <Link href='/' className="flex items-center">
                <SiTemporal className="text-4xl font-extrabold text-slate-900 ml-10" /> 
                <h1 className="text-slate-800 text-3xl font-mono font-bold">Tempa</h1>
            </Link>
            <LoginBtn className="ml-auto" session={session} />
        </nav>
    )
}

export default Nav