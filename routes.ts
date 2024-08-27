export const Routes = {
  "HOME": "/",
  "EVENTS": "/events",
  "LOGIN": "/login",
  "SIGNUP": "/signup",
  "DASHBOARD": "/dashboard",
  "ONBOARDING": "/onboarding",
}


export const publicRoutes = [
  Routes.HOME,
  Routes.EVENTS,
  Routes.LOGIN,
  Routes.SIGNUP,
]

export const authRoutes = [
  Routes.LOGIN,
  Routes.SIGNUP,
]

export const apiAuthPrefix = '/api/auth'

export const DEFAULT_LOGIN_REDIRECT = Routes.ONBOARDING