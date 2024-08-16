import type { NextAuthConfig } from 'next-auth'
export const authConfig = {
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: '/login',
    newUser: '/signup'
  },
  callbacks: {
    async authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isOnLoginPage = nextUrl.pathname.startsWith('/login')
      const isOnSignupPage = nextUrl.pathname.startsWith('/signup')
      const isOnHomePage = nextUrl.pathname.startsWith('/')
      console.log("isLoggedIn", isLoggedIn);

      if (isLoggedIn) {
        if (isOnLoginPage || isOnSignupPage) {
          return Response.redirect(new URL('/', nextUrl))
        }
      } else {
        if (!isOnLoginPage && !isOnSignupPage && !isOnHomePage) {
          return Response.redirect(new URL('/login', nextUrl))
        }
      }

      return true
    },
    async jwt({ token, user }) {
      // console.log("token in auth config jwt", token);
      // console.log("user in auth config jwt", user);
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
  providers: []
} satisfies NextAuthConfig
