import React from 'react';
import { Search, MoreVertical, Calendar, Ticket, Tag } from 'lucide-react';
import EventCreationModal from '../../../components/organizer/modal/EventCreationModal';

interface Event {
  id: number;
  title: string;
  status: "Publish" | "Draft";
  date: string;
  tickets: number;
  sold: number;
  type: "Online Event" | "Venue Event";
}

const mockEvents: Event[] = [
  {
    id: 1,
    title: "Tutorial on Canvas Painting for Beginners",
    status: "Publish",
    date: "30 Jun, 2022 10:00 AM",
    tickets: 250,
    sold: 20,
    type: "Online Event"
  },
  {
    id: 2,
    title: "Advanced JavaScript Workshop",
    status: "Draft",
    date: "15 Jul, 2022 2:00 PM",
    tickets: 100,
    sold: 45,
    type: "Online Event"
  },
  {
    id: 3,
    title: "Local Food Festival",
    status: "Publish",
    date: "20 Aug, 2022 11:00 AM",
    tickets: 500,
    sold: 320,
    type: "Venue Event"
  },
  {
    id: 4,
    title: "Photography Masterclass",
    status: "Publish",
    date: "5 Sep, 2022 9:00 AM",
    tickets: 50,
    sold: 12,
    type: "Online Event"
  },
  {
    id: 5,
    title: "Startup Networking Mixer",
    status: "Draft",
    date: "10 Oct, 2022 6:00 PM",
    tickets: 200,
    sold: 0,
    type: "Venue Event"
  }
];

const EventCard: React.FC<{ event: Event }> = ({ event }) => (
  <div className="bg-white rounded-lg shadow p-4 mb-4">
    <div className="flex flex-col sm:flex-row items-start sm:items-center">
      <img
        src={`/api/placeholder/100/100?text=${event.id}`}
        alt={`Event ${event.id} thumbnail`}
        className="w-full sm:w-16 h-16 object-cover rounded mb-4 sm:mb-0 sm:mr-4"
      />
      <div className="flex-grow">
        <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
        <div className="flex flex-wrap items-center text-sm text-gray-600 gap-4">
          <div className="flex items-center">
            <span className={`mr-2 w-2 h-2 rounded-full ${event.status === 'Publish' ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
            <span>{event.status}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="mr-2" size={16} />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center">
            <Ticket className="mr-2" size={16} />
            <span>{event.tickets}</span>
          </div>
          <div className="flex items-center">
            <Tag className="mr-2" size={16} />
            <span>{event.sold}</span>
          </div>
        </div>
      </div>
      <button className="p-2 mt-4 sm:mt-0">
        <MoreVertical size={20} />
      </button>
    </div>
  </div>
);

const OrganizerEventManagement: React.FC = () => {
  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-2xl font-bold mb-4 sm:mb-0">Events</h1>
        <div className='flex justify-between'>
        <EventCreationModal />
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Events ({mockEvents.length})</h2>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center mb-4 gap-4">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search by event name, status"
              className="w-full p-2 border rounded-md pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
          <div className="flex flex-wrap gap-2">
            <button className="bg-blue-900 text-white px-4 py-2 rounded flex-grow sm:flex-grow-0">
              All Event ({mockEvents.length})
            </button>
            <button className="bg-white text-gray-700 px-4 py-2 rounded border flex-grow sm:flex-grow-0">
              Online Event ({mockEvents.filter(e => e.type === "Online Event").length})
            </button>
            <button className="bg-white text-gray-700 px-4 py-2 rounded border flex-grow sm:flex-grow-0">
              Venue Event ({mockEvents.filter(e => e.type === "Venue Event").length})
            </button>
          </div>
        </div>
      </div>

      {mockEvents.map(event => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};

export default OrganizerEventManagement;