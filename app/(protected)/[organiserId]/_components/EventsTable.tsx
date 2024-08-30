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
import { ChevronsUpDown, MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
// import { deleteInventory } from '../../action';
import { Event } from "@prisma/client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Props = {
  events: Event[];
  organiserId: string;
};

export function EventsTable({ events, organiserId }: Readonly<Props>) {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Event | null>(null);

  const handleConfirm = () => {
    if (selectedItem) {
      // deleteInventory(selectedItem.id);
    }
    setIsDialogOpen(false);
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
  };

  const columns: ColumnDef<(typeof events)[0]>[] = [
    // {
    //   accessorKey: "id",
    //   header: "ID",
    //   cell: (info) => (
    //     <div className='py-1'>{`${info.getValue() ?? "N/A"}`}</div>
    //   ),
    // },
    {
      accessorKey: "name",
      header: "Name",
      cell: (info) => (
        <div className='py-1'>{`${info.getValue() ?? "N/A"}`}</div>
      ),
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: (info) => (
        <div className='py-1'>{`${new Date().toLocaleDateString() ?? "N/A"
          }`}</div>
      ),
    },
    {
      accessorKey: "location",
      header: "Location",
      cell: (info) => (
        <div className='py-1'>{`${info.getValue() ?? "N/A"}`}</div>
      ),
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: (info) => (
        <div className='py-1'>{`${info.getValue() ?? "No description available"
          }`}</div>
      ),
    },
    // {
    //   accessorKey: "organizerId",
    //   header: "Organizer ID",
    //   cell: (info) => (
    //     <div className='py-1'>{`${info.getValue() ?? "N/A"}`}</div>
    //   ),
    // },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const event = row.original;
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
                onClick={() => navigator.clipboard.writeText(String(event.id))}
              >
                Copy event ID
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  router.push(`/${organiserId}/events/${event.slug}`)
                }
              >
                Edit Event
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedItem(event);
                  setIsDialogOpen(true);
                }}
                className='cursor-pointer'
              >
                <span className='text-red-500'>Delete Event</span>
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
              {`Are you sure you want to delete this event ${selectedItem?.name}?`}
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
        <ReusableTable data={events} columns={columns} />
      </div>
    </>
  );
}
