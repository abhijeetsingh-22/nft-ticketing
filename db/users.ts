'use server'
import { prisma } from "@/lib/db";

export async function createUser({ email, name, walletAddress }: { email: string, name: string, walletAddress: string }) {
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
      name,
      walletAddress,
      updatedAt: new Date(),
    },
  })

  return { type: 'success', resultCode: 'USER_CREATED', userId: newUser.id }
}
