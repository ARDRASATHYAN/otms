import React, { useEffect, useState } from 'react';
import { FaUserCircle, FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const TopBar = ({ toggleSidebar }) => {
  const [bankname, setBankname] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const username = localStorage.getItem('username');

  useEffect(() => {
    const name = localStorage.getItem('bankname');
    if (name) {
      setBankname(name);
    }
  }, []);

  const handleUserIconClick = () => {
    setDropdownOpen((prevState) => !prevState);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("bid");
    localStorage.removeItem("bankname");
    localStorage.removeItem('username');
    localStorage.removeItem('tokenExpiration');
    window.location.reload('refresh_token');
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  return (
    <div className="flex items-center justify-between bg-customPurple px-4 py-3 text-white fixed top-0 w-full z-10 h-16 shadow-lg">
   
      <button onClick={toggleSidebar} className="md:hidden">
        <FaBars
          size={28}
          className="text-white hover:text-purple-300 transition duration-300"
        />
      </button>

    
      <div className="flex items-center space-x-2">
        <div className="bg-white text-purple-700 font-bold p-2 rounded-full">
          <span className="text-xl">🏦</span>
        </div>
        <div className="text-lg font-semibold font-sans">{bankname}</div>
      </div>

     
      <div className="relative">
        <div className="flex items-center space-x-2 cursor-pointer" onClick={handleUserIconClick}>
          <FaUserCircle
            size={32}
            className="hover:text-customblue transition duration-300"
          />
          <span className="font-medium">{username}</span>
        </div>

        {dropdownOpen && (
          <div
            className="absolute right-0 mt-2 w-40 bg-white text-black rounded-md shadow-xl border border-gray-200 transition-all duration-300"
            onMouseLeave={closeDropdown}
          >
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 hover:bg-customblue rounded-t-md transition duration-200"
            >
              Logout
            </button>
            <button className="block w-full text-left px-4 py-2 hover:bg-customblue transition duration-200">
              <Link to="/validatepin">Pin Change</Link>
            </button>
            <button className="block w-full text-left px-4 py-2 hover:bg-customblue rounded-b-md transition duration-200">
              <Link to="/changepassword">Password Change</Link>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopBar;

