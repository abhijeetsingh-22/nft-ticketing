'use client';
import { useState } from 'react';

import { ReusableTable } from '@/components/ReusableTable';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { ColumnDef } from '@tanstack/react-table';
import { ChevronsUpDown, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
// import { deleteInventory } from '../../action';
import { Event } from '@prisma/client';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';

type Props = {
  events: Event[];
  organiserId: string;
};

export function EventsTable({
  events,
  organiserId,
}: Readonly<Props>) {
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
    {
      accessorKey: 'id',
      header: ({ column }) => (
        <Button
          className="p-0"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          <div className="flex gap-2 capitalize">
            ID <ChevronsUpDown className="size-4" />
          </div>
        </Button>
      ),
      cell: (info) => (
        <div className="py-1">{`${info.getValue() ?? 'N/A'}`}</div>
      ),
    },
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <Button
          className="p-0"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          <div className="flex gap-2 capitalize">
            Name <ChevronsUpDown className="size-4" />
          </div>
        </Button>
      ),
      cell: (info) => (
        <div className="py-1">{`${info.getValue() ?? 'N/A'}`}</div>
      ),
    },
    {
      accessorKey: 'date',
      header: ({ column }) => (
        <Button
          className="p-0"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          <div className="flex gap-2 capitalize">
            Date <ChevronsUpDown className="size-4" />
          </div>
        </Button>
      ),
      cell: (info) => (
        <div className="py-1">{`${new Date().toLocaleDateString() ?? 'N/A'}`}</div>
      ),
    },
    {
      accessorKey: 'location',
      header: ({ column }) => (
        <Button
          className="p-0"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          <div className="flex gap-2 capitalize">
            Location <ChevronsUpDown className="size-4" />
          </div>
        </Button>
      ),
      cell: (info) => (
        <div className="py-1">{`${info.getValue() ?? 'N/A'}`}</div>
      ),
    },
    {
      accessorKey: 'description',
      header: ({ column }) => (
        <Button
          className="p-0"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          <div className="flex gap-2 capitalize">
            Description <ChevronsUpDown className="size-4" />
          </div>
        </Button>
      ),
      cell: (info) => (
        <div className="py-1">{`${info.getValue() ?? 'No description available'}`}</div>
      ),
    },
    {
      accessorKey: 'organizerId',
      header: ({ column }) => (
        <Button
          className="p-0"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          <div className="flex gap-2 capitalize">
            Organizer ID <ChevronsUpDown className="size-4" />
          </div>
        </Button>
      ),
      cell: (info) => (
        <div className="py-1">{`${info.getValue() ?? 'N/A'}`}</div>
      ),
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const event = row.original;
        return (
          <Trash2
            className="w-4 h-4 text-red-400 hover:text-red-500 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedItem(event);
              setIsDialogOpen(true);
            }}
          />
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
          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleConfirm}>Confirm</Button>
          </div>
        </DialogContent>
      </Dialog>
      <div className='mt-10'>
        <ReusableTable
          data={events}
          columns={columns}
          onRowDoubleClick={(row) => {
            router.push(
              `/organization/${organiserId}/events/${row.id}`,
            );
          }}
        />
      </div>
    </>
  );
}
