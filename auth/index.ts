import NextAuth from "next-auth"
import { authConfig } from "./auth.config"
import Credentials from 'next-auth/providers/credentials'
import { z } from 'zod'
import { getStringFromBuffer } from "@/lib/utils"
import { getUser } from "@/db/users"


export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({
            email: z.string().email(),
            password: z.string().min(6)
          })
          .safeParse(credentials)

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data
          const user = await getUser(email)

          if (!user) return null

          const encoder = new TextEncoder()
          const saltedPassword = encoder.encode(password + user.salt)
          const hashedPasswordBuffer = await crypto.subtle.digest(
            'SHA-256',
            saltedPassword
          )
          const hashedPassword = getStringFromBuffer(hashedPasswordBuffer)


          if (hashedPassword === user.password) {
            console.log('AUTHORIZED user', user);
            return user
          } else {
            console.log('UNAUTHORIZED user', user);
            return null
          }
        }

        return null
      }
    })

  ],
})