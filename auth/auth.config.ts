import { getUser } from '@/db/users'
import { getStringFromBuffer } from '@/lib/utils'
import type { NextAuthConfig } from 'next-auth'
import credentials from 'next-auth/providers/credentials'
import { z } from 'zod'
export const authConfig = {
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: '/login',
    newUser: '/signup'
  },

  callbacks: {
    // async authorized({ auth, request: { nextUrl } }) {
    //   const isLoggedIn = !!auth?.user

    //   // const isOnLoginPage = nextUrl.pathname.startsWith('/login')
    //   // const isOnSignupPage = nextUrl.pathname.startsWith('/signup')
    //   // const isOnHomePage = nextUrl.pathname.startsWith('/')
    //   // console.log("isLoggedIn", isLoggedIn, auth?.user?.email);

    //   // if (isLoggedIn) {
    //   //   if (isOnLoginPage || isOnSignupPage) {
    //   //     return Response.redirect(new URL('/', nextUrl))
    //   //   }
    //   // } else {
    //   //   if (!isOnLoginPage && !isOnSignupPage && !isOnHomePage) {
    //   //     return Response.redirect(new URL('/login', nextUrl))
    //   //   }
    //   // }

    //   return true
    // },
    async jwt({ token, user }) {
      if (user) {
        token = { ...token, id: user.id }
      }

      return token
    },
    async session({ session, token }) {
      if (token) {
        const { id } = token as { id: string }
        const { user } = session
        session = { ...session, user: { ...user, id } }
      }

      return session
    }
  },
  providers: [
    credentials({
      async authorize(credentials) {
        const validatedFields = z.object({
          email: z.string().email(),
          password: z.string().min(6)
        }).safeParse(credentials)

        if (validatedFields.success) {
          const { email, password } = validatedFields.data
          const user = await getUser(email)

          if (!user || !password) return null

          const encoder = new TextEncoder()
          const saltedPassword = encoder.encode(password + user.salt)
          const hashedPasswordBuffer = await crypto.subtle.digest(
            'SHA-256',
            saltedPassword
          )
          const hashedPassword = getStringFromBuffer(hashedPasswordBuffer)


          if (hashedPassword === user.password) {
            console.log("AUTHORIZED user", user);
            // if (!user.isOnboarded) {
            //   return Response.redirect(new URL('/onboarding').toString())
            // }

            return user
          } else {
            // console.log('UNAUTHORIZED user', user);
            return null
          }
        }
        return null;
      }
    })
  ]
} satisfies NextAuthConfig
