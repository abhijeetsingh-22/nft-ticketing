import Navbar from "@/components/Navbar";


export default function PublicLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <main className="min-h-screen grainy">
    <Navbar />
    {children}
  </main>
}
