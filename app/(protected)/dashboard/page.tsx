import { auth } from "@/auth"
import { ContentLayout } from "@/components/admin-panel/content-layout";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Dashboard from "./_components/Dashboard";

export default async function DashboardPage() {
  const session = await auth();

  return (
    <ContentLayout title='Dashboard' className="bg-gray-50 min-h-screen">
      <Dashboard name={session?.user?.name as string} />
    </ContentLayout>
  )
}