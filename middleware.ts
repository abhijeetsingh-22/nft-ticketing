import NextAuth from 'next-auth'
import { authConfig } from './auth/auth.config'
import { apiAuthPrefix, authRoutes, publicRoutes, Routes } from '@/routes';

const { auth } = NextAuth(authConfig)

export default auth((req) => {
  const { nextUrl } = req;
  const user = req.auth?.user;

  const isLoggedIn = !!user;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isAuthroute = authRoutes.includes(nextUrl.pathname);
  const isPublicRoute = publicRoutes.some(route => {
    if (route.includes(':')) {
      const routeParts = route.split('/');
      const urlParts = nextUrl.pathname.split('/');
      return routeParts.every((part, i) => part.startsWith(':') || part === urlParts[i]);
    }
    return route === nextUrl.pathname;
  });

  if (isApiAuthRoute) {
    return;
  }



  if (isAuthroute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(Routes.DASHBOARD, nextUrl).toString())
    }
    return;
  }


  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL('/login', nextUrl).toString())
  }

  return;
})

export const config = {
  matcher: [
    // Skip Next.js internals, all static files, and all /api routes unless found in search params
    '/((?!_next|api|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for trpc routes
    '/trpc(.*)',
    '/events(.*)',
  ],
}

