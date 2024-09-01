"use server"
import prisma from "@/db";

export const registerForEarlyAccess = async (email: string) => {
    // Validate the email
    if (!email || !email.includes("@")) {
        return { error: "Invalid email address", code: 400 };
    }

    try {
        // Attempt to create a new registration
        const existingRegistration = await prisma.newsletterEmails.findUnique({
            where: { email },
        })

        if (existingRegistration) {
            return ({ message: "You have already registered for early access!", code: 200 });
        }
        const newRegistration = await prisma.newsletterEmails.create({
            data: { email },
        });
        
        if (newRegistration) {
            return ({ message: "Thank you for registering for early access!", code: 200 });
        }
        return ({ message: "Oops! Something went wrong.", code: 500 });
    } catch (error) {
        console.error(error);
        return ({ message: "Something went wrong. Please try again later.", code: 500 });
    }
}
