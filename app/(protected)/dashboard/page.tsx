import { auth } from "@/auth"
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

export default async function DashboardPage() {
  const session = await auth();

  return (
    <MaxWidthWrapper className="flex flex-col p-4">
      <h1 className="font-bold text-2xl">Dashboard</h1>
      <div>{JSON.stringify(session)}</div>
    </MaxWidthWrapper>
  )
}