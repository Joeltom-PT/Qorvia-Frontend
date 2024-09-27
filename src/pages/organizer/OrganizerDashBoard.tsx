import React, { useState } from 'react';
import { FaHome, FaCalendarAlt, FaBlog, FaChartBar, FaFileAlt, FaCreditCard, FaCog, FaUser, FaSignOutAlt, FaQuestionCircle, FaBars, FaTimes } from 'react-icons/fa';
import { IconType } from 'react-icons';

interface NavItem {
  icon: IconType;
  label: string;
}

interface StatCard {
  label: string;
  value: string;
}

interface Event {
  name: string;
  start: string;
  end: string;
  location: string;
}

const navItems: NavItem[] = [
  { icon: FaHome, label: 'Home' },
  { icon: FaCalendarAlt, label: 'Events' },
  { icon: FaBlog, label: 'Blogs' },
  { icon: FaChartBar, label: 'Reports and Graph' },
  { icon: FaFileAlt, label: 'Reports' },
  { icon: FaCreditCard, label: 'Payouts' },
  { icon: FaCog, label: 'Settings' },
];

const Sidebar: React.FC<{ isOpen: boolean; toggleSidebar: () => void }> = ({ isOpen, toggleSidebar }) => (
  <div className={`bg-blue-900 text-white flex flex-col transition-all duration-300 ${isOpen ? 'w-52' : 'w-16'} min-h-full`}>
    <div className="p-4 bg-blue-950 flex justify-between items-center">
      <img src='/secondary_logo.svg' className={`${isOpen ? 'block' : 'hidden'} h-5`} />
      <button onClick={toggleSidebar} className="text-white focus:outline-none">
        {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>
    </div>
    <nav className="flex-grow">
      <ul className="space-y-2 p-4">
        {navItems.map((item, index) => (
          <li key={index}>
            <a href="#" className="flex items-center space-x-2 p-2 rounded hover:bg-blue-800">
              <item.icon className="text-blue-100" size={16} />
              <span className={isOpen ? 'block' : 'hidden'}>{item.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
    <div className="p-4 space-y-2 mb-4">
      <button className="w-full bg-blue-800 p-2 rounded flex items-center justify-center space-x-2">
        <FaUser />
        <span className={isOpen ? 'block' : 'hidden'}>Profile</span>
      </button>
      <button className="w-full bg-red-600 p-2 rounded flex items-center justify-center space-x-2">
        <FaSignOutAlt />
        <span className={isOpen ? 'block' : 'hidden'}>Log Out</span>
      </button>
      <button className="w-full bg-blue-800 p-2 rounded flex items-center justify-center space-x-2">
        <FaQuestionCircle />
        <span className={isOpen ? 'block' : 'hidden'}>Help</span>
      </button>
    </div>
  </div>
);

const Navbar: React.FC = () => (
  <div className="bg-white shadow-md p-3">
    <h1 className="text-xl font-bold text-blue-900">Organizer Dashboard</h1>
  </div>
);

const OrganizerDashboard: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const statCards: StatCard[] = [
    { label: 'Total events', value: '8' },
    { label: 'Events this week', value: '2' },
    { label: 'Events today', value: '1' },
    { label: 'Published Blogs', value: '47' },
  ];

  const events: Event[] = [
    { name: 'Conference 2022', start: 'Oct 12, 9:00 AM', end: 'Oct 12, 6:00 PM', location: 'San Francisco' },
    { name: 'Webinar: Product Launch', start: 'Nov 15, 10:00 AM', end: 'Nov 15, 11:00 AM', location: 'Online' },
    { name: 'Workshop: Growth Hacking', start: 'Dec 5, 2:00 PM', end: 'Dec 5, 4:00 PM', location: 'Los Angeles' },
    { name: 'Seminar: Leadership Training', start: 'Jan 8, 1:00 PM', end: 'Jan 8, 5:00 PM', location: 'New York' },
    { name: 'Summit: Innovation Showcase', start: 'Feb 20, 11:00 AM', end: 'Feb 21, 3:00 PM', location: 'Austin' },
  ];

  return (
    <div className="flex h-screen bg-slate-100 text-sm">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-grow overflow-hidden">
        <Navbar />
        <div className="p-5 overflow-auto h-[calc(100vh-52px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
            {statCards.map((stat, index) => (
              <div key={index} className="bg-blue-800  text-white p-3 rounded-lg shadow-lg">
                <h2 className="text-md font-semibold">{stat.label}</h2>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-lg shadow-sm shadow-blue-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-blue-800 text-white">
                  <tr>
                    <th className="p-2 text-left">Event Name</th>
                    <th className="p-2 text-left">Starts</th>
                    <th className="p-2 text-left">Ends</th>
                    <th className="p-2 text-left">Location</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((event, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-blue-100' : 'bg-white'}>
                      <td className="p-2">{event.name}</td>
                      <td className="p-2">{event.start}</td>
                      <td className="p-2">{event.end}</td>
                      <td className="p-2">{event.location}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizerDashboard;
