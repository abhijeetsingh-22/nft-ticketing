import { auth } from "@/auth";
import Navbar from "@/components/Navbar";
import { LoggedInUserProvider } from "@/contexts/LoggedInUserContext";
import { getUserById } from "@/db/users";
import { User } from "@prisma/client";

export default async function PublicLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await auth();
	const user = await getUserById(session?.user?.id || "");
	return (
		<main className='min-h-screen'>
			<LoggedInUserProvider user={user as User}>
				<Navbar />
				{children}
			</LoggedInUserProvider>
		</main>
	);
}
