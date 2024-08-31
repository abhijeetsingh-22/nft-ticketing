"use client";
import { useState } from "react";

import { ReusableTable } from "@/components/ReusableTable";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
// import { deleteTicket } from '../../action';
import { Ticket } from "@prisma/client";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

type Props = {
	tickets: Ticket[];
	userId: string;
};

export function TicketsTable({ tickets, userId }: Readonly<Props>) {
	const router = useRouter();
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [selectedItem, setSelectedItem] = useState<Ticket | null>(null);

	const handleConfirm = () => {
		if (selectedItem) {
			// deleteTicket(selectedItem.id);
		}
		setIsDialogOpen(false);
	};

	const handleCancel = () => {
		setIsDialogOpen(false);
	};

	const columns: ColumnDef<(typeof tickets)[0]>[] = [
		{
			accessorKey: "tokenId",
			header: "Ticket ID",
			cell: (info) => (
				<div className='py-1'>{`${info.getValue() ?? "N/A"}`}</div>
			),
		},
		{
			accessorKey: "eventId",
			header: "Event ID",
			cell: (info) => (
				<div className='py-1'>{`${info.getValue() ?? "N/A"}`}</div>
			),
		},
		{
			accessorKey: "status",
			header: "Status",
			cell: (info) => (
				<div className='py-1'>{`${info.getValue() ?? "N/A"}`}</div>
			),
		},
		{
			accessorKey: "createdAt",
			header: "Created At",
			cell: (info) => (
				<div className='py-1'>{`${
					(info.getValue() as Date)?.toLocaleDateString() ?? "N/A"
				}`}</div>
			),
		},
		{
			id: "actions",
			enableHiding: false,
			cell: ({ row }) => {
				const ticket = row.original;
				return (
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant='ghost' className='p-0 w-8 h-8'>
								<span className='sr-only'>Open menu</span>
								<MoreHorizontal className='w-4 h-4' />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align='end'>
							<DropdownMenuLabel>Actions</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem
								onClick={() => {
									const ticketUrl = `${window.location.origin}/${userId}/tickets/${ticket.id}`;
									navigator.clipboard.writeText(ticketUrl);
									toast.success("Ticket link copied to clipboard");
								}}
							>
								Share Ticket
							</DropdownMenuItem>
							<DropdownMenuItem
								onClick={() => router.push(`/${userId}/tickets/${ticket.id}`)}
							>
								View Ticket
							</DropdownMenuItem>
							<DropdownMenuItem
								onClick={(e) => {
									e.stopPropagation();
									setSelectedItem(ticket);
									setIsDialogOpen(true);
								}}
								className='cursor-pointer'
							>
								<span className='text-red-500'>Delete Ticket</span>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				);
			},
		},
	];

	return (
		<>
			<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Confirm Deletion</DialogTitle>
						<DialogDescription>
							{`Are you sure you want to delete this ticket ${selectedItem?.tokenId}?`}
						</DialogDescription>
					</DialogHeader>
					<div className='flex justify-end gap-4'>
						<Button variant='outline' onClick={handleCancel}>
							Cancel
						</Button>
						<Button onClick={handleConfirm}>Confirm</Button>
					</div>
				</DialogContent>
			</Dialog>
			<div className='w-full'>
				<ReusableTable data={tickets} columns={columns} />
			</div>
		</>
	);
}
