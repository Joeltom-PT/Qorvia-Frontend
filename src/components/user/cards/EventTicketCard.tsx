import { Calendar, Ticket, Download } from 'lucide-react';

const EventTicketCard = () => {
  return (
    <div className="bg-white my-2 border border-blue-900 rounded-[5px] overflow-hidden">
      <div className="flex flex-col sm:flex-row">
        <img 
          src="https://img.freepik.com/premium-photo/painting-mountain-lake-with-lake-mountains-background_583952-93350.jpg" 
          alt="Event" 
          className="sm:w-1/3 w-full object-cover"
        />
        <div className="p-3 flex-grow">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h2 className="text-sm font-semibold text-gray-800">
                Tutorial on Canvas Painting for Beginners
              </h2>
              <p className="text-xs text-gray-500">Invoice ID: BRCCRW-11111111</p>
            </div>
            <button className="bg-red-600 text-white px-2 py-1 rounded-md hover:bg-red-700 transition duration-300 text-xs">
              Cancel Ticket
            </button>
          </div>
          <hr />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs mt-2">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <div>
                <p className="font-medium text-gray-700">Event Starts on</p>
                <p className="text-gray-600">01 June 2022</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Ticket className="h-4 w-4 text-gray-500" />
              <div>
                <p className="font-medium text-gray-700">Total Tickets</p>
                <p className="text-gray-600">16</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-4 w-4 text-gray-500">$</div>
              <div>
                <p className="font-medium text-gray-700">Paid Amount</p>
                <p className="text-gray-600">AUD $50.00</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Download className="h-4 w-4 text-gray-500" />
              <div>
                <p className="font-medium text-gray-700">Invoice</p>
                <a href="#" className="text-blue-600 hover:underline">Download</a>
              </div>
            </div>
          </div>
          <div className="mt-2">
            <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
              Status: Confirmed
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventTicketCard;
