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
    include: {
      socialLink: true,
    },
  })

  return user
}


export async function updateUser(id: string, data: Partial<User>) {
  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    })

    // revalidatePath('layout')
    // revalidatePath('/')

    return { type: 'success', resultCode: 'USER_UPDATED', user: updatedUser }
  } catch (error) {
    throw error;
  }
}
export async function updateSocialLink(userId: string, platform: 'instagramUrl' | 'twitterUrl' | 'githubUrl' | 'discordUrl', link: string) {
  try {
    console.log('Updating social link for user:', userId, 'platform:', platform, 'link:', link)
    const updatedSocialLink = await prisma.socialLink.upsert({
      where: { userId },
      update: {
        [platform]: link,
        updatedAt: new Date(),
      },
      create: {
        userId,
        [platform]: link,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    })

    revalidatePath('layout')
    revalidatePath('/')

    return { type: 'success', resultCode: 'SOCIAL_LINK_UPDATED', socialLink: updatedSocialLink }
  } catch (error) {
    throw error;
  }
}
