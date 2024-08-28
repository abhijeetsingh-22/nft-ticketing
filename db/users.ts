'use server'
import prisma from "@/db";
import { User } from "@prisma/client";
import { revalidatePath } from "next/cache";
export async function createUser({ email, name, walletAddress }: { email: string, name: string, walletAddress: string }) {
  const existingUser = await prisma.user.findUnique({
    where: { email },
  })

  if (existingUser) {
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


export async function updateUser(id: string, data: Partial<User>) {
  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        name: data?.name,
        isOnboarded: data?.isOnboarded,
        updatedAt: new Date(),
      },
    })

    revalidatePath('layout')
    revalidatePath('/')

    return { type: 'success', resultCode: 'USER_UPDATED', user: updatedUser }
  } catch (error) {
    throw error;
  }
}




