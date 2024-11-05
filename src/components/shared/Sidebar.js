import React from 'react';
import { FaHome, FaUserAlt, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { GrTransaction } from "react-icons/gr";

const Sidebar = ({ isOpen }) => {
  return (
    <div className={`bg-white text-blue-800 p-2 h-full md:block ${isOpen ? 'block' : 'hidden'} md:static`}>
      <nav className="flex flex-col space-y-4">
        <a href="#Dashboard" className="flex items-center p-2 hover:bg-gray-200 rounded font-sans">
          <FaHome className="mr-3" />
          <span>Dashboard</span>
        </a>
        <a href="#Account Summary" className="flex items-center p-2 hover:bg-gray-200 rounded font-sans">
          <FaUserAlt className="mr-3" />
          <span>Account Summary</span>
        </a>
        <a href="#Transaction Summary" className="flex items-center p-2 hover:bg-gray-200 rounded font-sans">
          <GrTransaction className="mr-3" />
          <span>Transaction</span>
        </a>
        <a href="#Cancelled Summary" className="flex items-center p-2 hover:bg-gray-200 rounded font-sans">
          <FaSignOutAlt className="mr-3" />
          <span>CancelledSummary</span>
        </a>
      </nav>
    </div>
  );
};

export default Sidebar;




