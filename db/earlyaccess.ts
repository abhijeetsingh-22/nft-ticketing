import prisma from "@/db";

export const registerForEarlyAccess = async (email: string) => {
    // Validate the email
    if (!email || !email.includes("@")) {
        return { error: "Invalid email address", code: 400 };
    }

    try {
        // Attempt to create a new registration
        const newRegistration = await prisma.EarlyAccessEmail.create({
            data: { email },
        });

        if (newRegistration) {
            return ({ message: "Thank you for registering for early access!", code: 200 });
        }
        return ({ message: "Oops! Something went wrong.", code: 500 });
    } catch (error) {
        return ({ error: "Something went wrong. Please try again later.", code: 500 });
    }
}
