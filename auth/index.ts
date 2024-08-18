import NextAuth from "next-auth"
import { authConfig } from "./auth.config"
import prisma from "@/db"
import { PrismaAdapter } from "@auth/prisma-adapter"


export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
})