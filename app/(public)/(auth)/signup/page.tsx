import { auth } from "@/auth";
import SignupForm2 from "@/components/auth/SignUp2";
import { Session } from "next-auth";
import { redirect } from "next/navigation";

export default async function SignupPage() {
	const session: Session | null = await auth();

	if (session) {
		redirect("/");
	}

	return (
		<main className='flex flex-col p-4'>
			<SignupForm2 />
		</main>
	);
}
