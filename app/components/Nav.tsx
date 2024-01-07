import { authOptions } from "@/option"
import { getServerSession } from "next-auth"
import LoginBtn from "./LoginBtn"
import { SiTemporal } from "react-icons/si";
import Link from "next/link";

const Nav = async() => {
  const session = await getServerSession(authOptions)
    return(
        <nav className="bg-neutral-300 h-14 flex items-center ">
            <Link href='/' className="flex items-center">
                <SiTemporal className="text-4xl font-extrabold text-blue-600 ml-10" /> 
                <h1 className="text-blue-600 text-3xl font-mono font-bold">Tempa</h1>
            </Link>
            <LoginBtn className="ml-auto" session={session} />
        </nav>
    )
}

export default Nav