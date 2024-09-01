import * as Dialog from "@radix-ui/react-dialog";
import React from "react";

export function DeleteEvent({
	event,
	onDelete,
}: {
	event: any;
	onDelete: () => void;
}) {
	const handleDelete = () => {
		onDelete();
	};

	return (
		<Dialog.Root>
			<Dialog.Trigger className='bg-white hover:bg-red-500 px-4 py-2 border border-red-500 rounded-md text-red-500 hover:text-white transition-all duration-150 ease-in-out'>
				X
			</Dialog.Trigger>

			<Dialog.Portal>
				<Dialog.Overlay className='fixed inset-0 bg-black/50' />
				<Dialog.Content className='top-1/2 left-1/2 fixed bg-white shadow-lg p-6 rounded-md w-96 transform -translate-x-1/2 -translate-y-1/2'>
					<Dialog.Title className='mb-4 font-bold text-xl'>
						Delete Event
					</Dialog.Title>
					<Dialog.Description className='mb-6'>
						Are you sure you want to delete the event &quot;{event.name}&quot;?
					</Dialog.Description>
					<div className='flex justify-end space-x-4'>
						<button
							onClick={handleDelete}
							className='bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md text-white transition-all duration-150 ease-in-out'
						>
							Confirm Delete
						</button>
						<Dialog.Close className='bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md text-gray-700 transition-all duration-150 ease-in-out'>
							Cancel
						</Dialog.Close>
					</div>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
}
