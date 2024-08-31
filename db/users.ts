'use server'
import prisma from "@/db";
import { SocialLink, User } from "@prisma/client";
import { revalidatePath } from "next/cache";


interface CreateUserParams {
  email: string;
  name: string;
  walletAddress?: string;
  password: string;
  salt: string;
  id: string;
}

export async function createUser({ email, name, walletAddress, password, salt, id }: CreateUserParams) {
  const existingUser = await prisma.user.findUnique({
    where: { email },
  })

  if (existingUser) {
    return { type: 'error', resultCode: 'USER_EXISTS' }
  }


  const newUser = await prisma.user.create({
    data: {
      id,
      email,
      password,
      salt,
      name,
      walletAddress,
      socialLink: {
        create: {
          instagramUrl: '',
          twitterUrl: '',
          githubUrl: '',
          discordUrl: '',
        },
      },
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
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        socialLink: true,
      },
    })
  
    return user
  }
  catch (error) {
    return null
  }
}


export async function updateUser(id: string, data: Partial<User & { socialLink: SocialLink }>) {
  try {
    const { id: _, socialLink, ...rest } = data;
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        ...rest,
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
