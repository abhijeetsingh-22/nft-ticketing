import * as Dialog from '@radix-ui/react-dialog';
import React, { useState } from 'react';

export function EditEvent({ event, onEdit }: { event: any; onEdit: (updatedEvent: any) => void }) {
  const [eventName, setEventName] = useState(event.name);
  const [eventDescription, setEventDescription] = useState(event.description);
  const [location, setLocation] = useState(event.location);
  const [eventDate, setEventDate] = useState(event.date);
  const [eventStartTime, setEventStartTime] = useState(event.startTime);
  const [eventEndTime, setEventEndTime] = useState(event.endTime);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');


  const handleSubmit = () => {
    if (!eventName || !eventDescription || !location || !eventDate || !eventStartTime || !eventEndTime) {
      setErrorMessage('Please fill in all the fields');
      setIsError(true);

      setTimeout(() => {
        setErrorMessage('');
        setIsError(false);
      }, 4000);

      return
    }

    const updatedEvent = { name: eventName, discription: eventDescription, date: eventDate, startTime: eventStartTime, endTime: eventEndTime, location: location };
    onEdit(updatedEvent);
    setEventName('');
    setEventDescription('');
    setLocation('');
    setEventDate('');
    setEventStartTime('');
    setEventEndTime('');
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all duration-150 ease-in-out">
        Edit Event
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/50 fixed inset-0" />
        <Dialog.Content className="bg-white p-6 rounded-md shadow-lg fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96">
          <Dialog.Title className="text-xl font-bold mb-4">Edit Event</Dialog.Title>
          <Dialog.Description className="mb-6">
            Modify the details below to edit the event.
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
          <div className="mb-4">
            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Event Discription"
              value={eventDescription}
              onChange={(e) => setEventDescription(e.target.value)}
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
          <div className="mb-6">
            <input
              type="time"
              placeholder="Start Time"
              value={eventStartTime}
              onChange={(e) => setEventStartTime(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <input
              type="time"
              placeholder="End Time"
              value={eventEndTime}
              onChange={(e) => setEventEndTime(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {isError && <p className="text-red-500">{errorMessage}</p>}
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
