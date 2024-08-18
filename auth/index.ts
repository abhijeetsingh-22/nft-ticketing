import NextAuth from "next-auth"
import { authConfig } from "./auth.config"
import Credentials from 'next-auth/providers/credentials'
import { z } from 'zod'
import { getStringFromBuffer } from "@/lib/utils"
import { getUser } from "@/db/users"
import prisma from "@/db"
import { PrismaAdapter } from "@auth/prisma-adapter"


export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  session: {strategy: 'jwt'},
})