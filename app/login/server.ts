'use server'
import { prisma } from "@/lib/db";

export async function signup(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  console.log("Email:", email);
  console.log("Password:", password);


  if (!email || !password) {
    console.log("Missing fields");
    return { type: 'error', resultCode: 'MISSING_FIELDS' }
  }


  try {
    const existingUser = await prisma.users.findUnique({
      where: { email },
    })

    if (existingUser) {
      console.log("User exists");
      return { type: 'error', resultCode: 'USER_EXISTS' }
    }


    const newUser = await prisma.users.create({
      data: {
        email,
        name: email.split('@')[0], // Using part of email as name for now
        walletAddress: '', // Empty for now, can be updated later
        updatedAt: new Date(),
      },
    })

    console.log("User created");
    return { type: 'success', resultCode: 'USER_CREATED', userId: newUser.id }
  } catch (error) {
    console.error('Signup error:', error)
    return { type: 'error', resultCode: 'SERVER_ERROR' }
  }
}
