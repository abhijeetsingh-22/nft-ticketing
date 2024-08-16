'use server'
import { createUser } from "@/db/users"

export async function signup(formData: FormData) {
  const email = formData.get('email') as string
  const walletAddress = formData.get('walletAddress') as string
  const name = formData.get('name') as string

  if (!email || !walletAddress || !name) {
    console.log("Missing fields");
    // return { type: 'error', resultCode: 'MISSING_FIELDS' }
    return 'Missing Fields'
  }

  try {
    const { type, resultCode, userId } = await createUser({ email: email, walletAddress: walletAddress, name: name })
    if (resultCode === "USER_CREATED") {
      return 'User Created Successfully'
    } else {
      return resultCode
    }

  } catch (error) {
    console.error('Signup error:', error)
    // return { type: 'error', resultCode: 'SERVER_ERROR' }
    return 'Internal Server Error'
  }
}
