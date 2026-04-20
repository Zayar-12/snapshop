import NextAuth from "next-auth"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "."
import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter:DrizzleAdapter(db) as any,
    session:{strategy:"jwt"},
    trustHost: true,
    debug: true,
    secret:process.env.AUTH_SECRET,
  providers: [
    Google({
      clientId:process.env.AUTH_GOOGLE_ID,
      clientSecret:process.env.AUTH_GOOGLE_SECRET
    }),
    GitHub({
      clientId:process.env.AUTH_GITHUB_ID,
      clientSecret:process.env.AUTH_GITHUB_SECRET
    })
   

  ],
})