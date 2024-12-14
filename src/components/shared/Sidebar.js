import React from 'react';
import { FaHome, FaUserAlt, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { GrTransaction } from "react-icons/gr";
import { Link } from 'react-router-dom';


const Sidebar = ({ isOpen }) => {
  return (
    <div className={`bg-white text-blue-800 p-5 h-full md:block ${isOpen ? 'block' : 'hidden'} md:static`}>
      <nav className="flex flex-col space-y-4">
        {/* <a href="#Dashboard" className="flex items-center p-2 hover:bg-gray-200 rounded font-sans">
          <FaHome className="mr-3" />
          <span>Dashboard</span>
        </a> */}
        <Link to="/home" className="flex items-center p-2 hover:bg-gray-200 rounded font-sans">
        <FaHome className="mr-3" />
          <span>Agents</span>
        </Link>
        <Link to="/accounts" className="flex items-center p-2 hover:bg-gray-200 rounded font-sans">
          <FaUserAlt className="mr-3" />
          <span>Account </span>
        </Link>
        <Link to="/trans" className="flex items-center p-2 hover:bg-gray-200 rounded font-sans">
          <GrTransaction className="mr-3" />
          <span>Transaction</span>
          </Link>
        <a href="/cancel" className="flex items-center p-2 hover:bg-gray-200 rounded font-sans">
          <FaSignOutAlt className="mr-3" />
          <span>Cancelled</span>
        </a>
       
      </nav>
    </div>
  );
};

export default Sidebar;




