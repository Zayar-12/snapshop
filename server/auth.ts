import NextAuth from "next-auth"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "."
 
export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter:DrizzleAdapter(db),
    session:{strategy:"jwt"},
    secret:process.env.AUTH_SECRET,
  providers: [],
})