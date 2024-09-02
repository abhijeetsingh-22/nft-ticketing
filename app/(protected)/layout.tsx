import { auth } from "@/auth";
import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import { LoggedInUserProvider } from "@/contexts/LoggedInUserContext";
import { getUserById } from "@/db/users";
import { User } from "@prisma/client";

export default async function PrivateLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await auth();
	const user = await getUserById(session?.user?.id || "");
	return (
		<LoggedInUserProvider user={user as User}>
			<AdminPanelLayout>{children}</AdminPanelLayout>
		</LoggedInUserProvider>
	);
}
