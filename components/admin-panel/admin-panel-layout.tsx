"use client";

import { cn } from "@/lib/utils";
import { useStore } from "@/hooks/use-store";
import { Sidebar } from "@/components/admin-panel/sidebar";
import { useSidebarToggle } from "@/hooks/use-sidebar-toggle";

export default function AdminPanelLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const sidebar = useStore(useSidebarToggle, (state) => state);

	if (!sidebar) return null;

	return (
		<>
			<Sidebar />
			<main
				className={cn(
					"min-h-[100vh] dark:bg-zinc-900 transition-[margin-left] ease-in-out duration-300 ",
					sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-72"
				)}
			>
				{children}
			</main>
		</>
	);
}
