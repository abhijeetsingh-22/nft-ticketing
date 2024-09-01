export const Routes = {
  "HOME": "/",
  "EVENTS": "/events",
  "LOGIN": "/login",
  "SIGNUP": "/signup",
  "DASHBOARD": "/dashboard",
  "ONBOARDING": "/onboarding",
  "REPORT_ISSUE": "/report-issue",
  "EVENT_DETAILS": "/events/:eventId"
}


export const publicRoutes = [
  Routes.HOME,
  Routes.EVENTS,
  Routes.LOGIN,
  Routes.SIGNUP,
  Routes.REPORT_ISSUE,
  Routes.EVENT_DETAILS,
]

export const authRoutes = [
  Routes.LOGIN,
  Routes.SIGNUP,
]

export const apiAuthPrefix = '/api/auth'

export const DEFAULT_LOGIN_REDIRECT = Routes.DASHBOARD