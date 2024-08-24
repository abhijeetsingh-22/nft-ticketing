import { auth } from "@/auth"
import { ContentLayout } from "@/components/admin-panel/content-layout";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

export default async function DashboardPage() {
  const session = await auth();

  return (
    <ContentLayout title='Dashboard'>
      <MaxWidthWrapper className="flex flex-col p-4">
        <h1 className="font-bold text-2xl">Dashboard</h1>
        <div>{JSON.stringify(session)}</div>
      </MaxWidthWrapper>
    </ContentLayout>
  )
}