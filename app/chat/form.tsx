'use client'

import { useRef, useState } from "react";
import { MdSend } from "react-icons/md"

export default function ChatForm({formAction}:{formAction:string | ((formData: FormData) => void)}) {
    const [msg, setMsg] = useState('')

    function handleSend() {
        setMsg('')
    }

    return (
        <form action={formAction} className="flex items-center w-full gap-1" onSubmit={handleSend}>
            <input name="msg" value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Enter your text..." className="block w-full p-2 pl-4 h-10 rounded-full mt-2 " autoComplete="off" autoFocus />
            <button className="bg-secondary rounded-lg px-2 py-1 h-10 flex items-center justify-center hover:bg-secondary/80 group" type="submit">
                <MdSend className="text-2xl text-foreground group-active:scale-75 group-hover:-rotate-45 transition" />
            </button>
        </form>
    )
}
