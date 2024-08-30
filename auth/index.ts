import NextAuth, { DefaultSession } from "next-auth"
import { DefaultJWT } from "next-auth/jwt"
import { authConfig } from "./auth.config"
import prisma from "@/db"
import { PrismaAdapter } from "@auth/prisma-adapter"

export type UserInfo = {
	id: string
	name: string
	email?: string
	isOnboarded: boolean
}
declare module "next-auth" {
	/**
	 * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	 */
	interface Session {
		user: UserInfo & DefaultSession["user"]
	}
}
declare module "next-auth/jwt" {
	interface JWT {
		user: UserInfo & DefaultJWT["user"]
		id: string
	}
}
export const { handlers, auth, signIn, signOut } = NextAuth({
	...authConfig,
	adapter: PrismaAdapter(prisma),
	session: { strategy: "jwt" },
})
