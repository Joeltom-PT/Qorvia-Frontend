import React from 'react';
import { TfiClose } from 'react-icons/tfi';
import './Sidebar.css';
import Button from './Button';
import { Link } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <div className={`fixed inset-0 z-50 bg-indigo-950 transition-transform ${isOpen ? 'transform translate-x-0' : 'transform -translate-x-full'}`}>
      <div className="bg-cover bg-center bg-no-repeat h-full w-full bg-[url('/user/bg/sidebar_bg_img.jpg')]">
        <div className="bg-blue-950 h-full opacity-90">
          <div className="p-4 flex justify-between items-center">
            <img src="/secondary_logo.svg" alt="Logo" className="max-w-[50%] md:max-w-[25%]" />
            <Button onClick={onClose} className='rounded'>
              <TfiClose size={25} />
            </Button>
          </div>
          <div className="p-4">
            <nav className="flex flex-col space-y-4">
              <Link to="/" onClick={onClose} className="text-white font-extrabold text-2xl hover:text-gray-300">Home</Link>
              <Link to="/explore" onClick={onClose} className="text-white font-extrabold text-2xl hover:text-gray-300">Explore Events</Link>
              <Link to="/organizers" onClick={onClose} className="text-white font-extrabold text-2xl hover:text-gray-300">Organizers</Link>
              <Link to="/become-an-organizer" onClick={onClose} className="text-white font-extrabold text-2xl hover:text-gray-300">Become an Organizer</Link>
              <Link to="/blogs" onClick={onClose} className="text-white font-extrabold text-2xl hover:text-gray-300">Blogs</Link>
              <Link to="/contact-support" onClick={onClose} className="text-white font-extrabold text-2xl hover:text-gray-300">Contact and Support</Link>
              <Link to="/about" onClick={onClose} className="text-white font-extrabold text-2xl hover:text-gray-300">About</Link>
              <Link to="/privacy-policy" onClick={onClose} className="text-white font-extrabold text-2xl hover:text-gray-300">Privacy and Policy</Link>
              <Link to="/faqs" onClick={onClose} className="text-white font-extrabold text-2xl hover:text-gray-300">FAQs</Link>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
