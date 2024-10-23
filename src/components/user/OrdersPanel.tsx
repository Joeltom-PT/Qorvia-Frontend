import EventTicketCard from './cards/EventTicketCard';

const OrdersPanel = () => {


  return (
    <div className="bg-white border border-blue-900 rounded-[5px] shadow-md p-4 w-full md:w-2/3 max-h-[400px] overflow-y-auto">
    <EventTicketCard />
    <EventTicketCard />
    <EventTicketCard />
    <EventTicketCard />
    {/* Add more EventTicketCard components as needed */}
  </div>
  )
}

export default OrdersPanel