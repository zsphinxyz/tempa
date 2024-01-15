import GoogleProvider from "next-auth/providers/google";
import {Account, CallbacksOptions, NextAuthOptions, Profile, Session, SessionOptions, TokenSet} from 'next-auth'
// import NextAuth from "next-auth/next";
import { FirestoreAdapter } from "@auth/firebase-adapter";
import { adminAuth, adminDb } from "./firebase-admin";
// import { Adapter } from "next-auth/adapters";
import { Provider } from "next-auth/providers/index";
import { JWT } from "next-auth/jwt";

export const authOptions:NextAuthOptions = {
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!
      }),
      // ...add more providers here
    ],
    callbacks: {
      session: async ({session, token}) => {
        if (session?.user) {
          if (token.sub) {
            session.user.id = token.sub;

            const firebaseToken = await adminAuth.createCustomToken(token.sub);
            session.firebaseToken = firebaseToken;
          }
        }
        return session;
      },
      jwt: async({user, token}) => {
        if (user) {
          token.sub = user.id;
        }
        return token;
      }
    },
    session:{
      strategy: 'jwt',
    },
    adapter: <any>FirestoreAdapter(adminDb),
} satisfies NextAuthOptions

// export default NextAuth(authOptions)
