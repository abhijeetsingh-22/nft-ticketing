import { auth } from "@/auth";
import { SiteFooter } from "@/components/Marketing/site-footer";
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
		<LoggedInUserProvider user={user as User}>
			{/* <SiteHeader /> */}
			<Navbar />
			<main className='mt-[3.5rem] min-h-screen'>{children}</main>
			<SiteFooter />
		</LoggedInUserProvider>
	);
}
