'use client';

import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';

export function CreateEvent({ onCreate }: { onCreate: (event: any) => void }) {
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');

  const handleSubmit = () => {
    const newEvent = { name: eventName, date: eventDate };
    onCreate(newEvent);
    setEventName('');
    setEventDate('');
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all duration-150 ease-in-out">
        Create New Event
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/50 fixed inset-0" />
        <Dialog.Content className="bg-white p-6 rounded-md shadow-lg fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96">
          <Dialog.Title className="text-xl font-bold mb-4">Create Event</Dialog.Title>
          <Dialog.Description className="mb-6">
            Fill in the details below to create a new event.
          </Dialog.Description>
          <div className="mb-4">
            <input 
              type="text" 
              placeholder="Event Name" 
              value={eventName} 
              onChange={(e) => setEventName(e.target.value)} 
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <input 
              type="date" 
              placeholder="Event Date" 
              value={eventDate} 
              onChange={(e) => setEventDate(e.target.value)} 
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button 
              onClick={handleSubmit}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all duration-150 ease-in-out"
            >
              Submit
            </button>
            <Dialog.Close className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-all duration-150 ease-in-out">
              Close
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
