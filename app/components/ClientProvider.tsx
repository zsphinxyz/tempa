'use client'
import { SessionProvider } from "next-auth/react";

const ClientProvider = ({children}:{children:React.ReactNode}) => {
  return (
    <SessionProvider>{children}</SessionProvider>
  )
}

export default ClientProvider