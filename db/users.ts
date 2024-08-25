'use server'
import prisma from "@/db";
export async function createUser({ email, name, walletAddress }: { email: string, name: string, walletAddress: string }) {
  const existingUser = await prisma.user.findUnique({
    where: { email },
  })

  if (existingUser) {
    console.log("User exists");
    return { type: 'error', resultCode: 'USER_EXISTS' }
  }


  const newUser = await prisma.user.create({
    data: {
      email,
      name,
      walletAddress,
      updatedAt: new Date(),
    },
  })

  return { type: 'success', resultCode: 'USER_CREATED', userId: newUser.id }
}

export async function getUser(email: string) {
  const user = await prisma.user.findUnique({
    where: { email },
  })

  return user
}


export async function getUserById(id: string) {
  const user = await prisma.user.findUnique({
    where: { id },
  })

  return user
}





