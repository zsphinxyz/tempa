import GoogleProvider from "next-auth/providers/google";
import {NextAuthOptions} from 'next-auth'
import NextAuth from "next-auth/next";

export const authOptions: NextAuthOptions = {
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!
      }),
      // ...add more providers here
    ]

} satisfies NextAuthOptions

export default NextAuth(authOptions)
