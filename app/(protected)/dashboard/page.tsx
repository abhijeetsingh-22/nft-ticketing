import { auth } from "@/auth";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import Dashboard from "./_components/Dashboard";

import { redirect } from "next/navigation";
import {
	getDashboardStats,
	getRecentOrders,
	RecentOrder,
} from "@/db/dashboard";

export default async function DashboardPage() {
	const session = await auth();
	const userId = session?.user?.id;

	if (!userId) {
		return redirect("/login");
	}

	if (!session.user.isOnboarded) {
		return redirect("/onboarding");
	}

	const stats = await getDashboardStats(userId);
	const recentOrders = await getRecentOrders(userId);

	return (
		<ContentLayout title='Dashboard' className='bg-gray-50 min-h-screen'>
			<Dashboard
				name={session?.user?.name as string}
				stats={stats}
				recentOrders={recentOrders as RecentOrder[]}
			/>
		</ContentLayout>
	);
}
