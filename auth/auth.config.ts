import { getUser } from "@/db/users"
import { getStringFromBuffer } from "@/lib/utils"
import { User } from "@prisma/client"
import type { NextAuthConfig } from "next-auth"
import credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import { z } from "zod"
export const authConfig = {
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/login",
    newUser: "/signup",
  },

  callbacks: {
    async authorized({ auth, request }) {
      const session = auth

      return !!session?.user
    },
    async redirect({ url, baseUrl }) {

      return url.startsWith(baseUrl) ? url : baseUrl
    },
    async jwt({ token, user: userParam, session, trigger }) {
      const user = userParam as User
      if (user) {
        token = {
          ...token,
          id: user.id,
          user: {
            id: user.id,
            name: user.name!,
            email: user.email,
            isOnboarded: user.isOnboarded,
          },
        }
      }
      if (trigger === 'update' && session?.user?.isOnboarded) {
        token = { ...token, user: { ...token.user, isOnboarded: true } }
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        const { id } = token
        const { user } = session
        session = { ...session, user: { ...token.user, ...user, id } }
      }

      return session
    },
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    credentials({
      async authorize(credentials) {
        const validatedFields = z
          .object({
            email: z.string().email(),
            password: z.string().min(6),
          })
          .safeParse(credentials)

        if (validatedFields.success) {
          const { email, password } = validatedFields.data
          const user = await getUser(email)
          console.log("login user", user)
          if (!user || !password) return null

          const encoder = new TextEncoder()
          const saltedPassword = encoder.encode(password + user.salt)
          const hashedPasswordBuffer = await crypto.subtle.digest("SHA-256", saltedPassword)
          const hashedPassword = getStringFromBuffer(hashedPasswordBuffer)

          if (hashedPassword === user.password) {
            return user
          } else {
            return null
          }
        }
        return null
      },
    }),
  ],
} satisfies NextAuthConfig
