import * as Dialog from '@radix-ui/react-dialog';
import React from 'react';

export function DeleteEvent({ event, onDelete }: { event: any; onDelete: () => void }) {
    const handleDelete = () => {
        onDelete();
    };

    return (
        <Dialog.Root>
            <Dialog.Trigger className="bg-white text-red-500 border border-red-500 px-4 py-2 rounded-md hover:bg-red-500 hover:text-white transition-all duration-150 ease-in-out">
                X
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Overlay className="bg-black/50 fixed inset-0" />
                <Dialog.Content className="bg-white p-6 rounded-md shadow-lg fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96">
                    <Dialog.Title className="text-xl font-bold mb-4">Delete Event</Dialog.Title>
                    <Dialog.Description className="mb-6">
                        Are you sure you want to delete the event &quot;{event.name}&quot;?
                    </Dialog.Description>
                    <div className="flex justify-end space-x-4">
                        <button 
                            onClick={handleDelete}
                            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-all duration-150 ease-in-out"
                        >
                            Confirm Delete
                        </button>
                        <Dialog.Close className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-all duration-150 ease-in-out">
                            Cancel
                        </Dialog.Close>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
