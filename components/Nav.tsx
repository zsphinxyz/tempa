import { authOptions } from "@/option"
import { getServerSession } from "next-auth"
import LoginBtn from "./LoginBtn"
import { SiTemporal } from "react-icons/si";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";

const Nav = async() => {
  const session = await getServerSession(authOptions)
    return(
        <nav className="bg-color1 h-14 flex items-center justify-between ">
            <Link href='/' className="flex items-center">
                <SiTemporal className="text-4xl font-extrabold text-foreground ml-10" /> 
                <h1 className="text-foreground text-3xl font-mono font-bold">Tempa</h1>
            </Link>
            <div className="flex items-center gap-3 px-10">
                <ModeToggle />
                <LoginBtn session={session} />
            </div>
        </nav>
    )
}

export default Nav