import { auth } from "@/auth"

export default async  function DashboardPage() {
  const session = await auth();

  return (
    <div className="flex flex-col p-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div>{JSON.stringify(session)}</div>
    </div>
  )
}