import React, { useEffect, useState } from 'react';
import { FaUserCircle, FaSearch, FaBars } from 'react-icons/fa';

const TopBar = ({ toggleSidebar, name }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);


  const handleUserIconClick = () => {
    setDropdownOpen(!dropdownOpen);
  };

 
  const handleLogout = () => {
    console.log("Logout clicked");
  
    localStorage.removeItem("token"); 
    window.location.reload(); 
  };

  useEffect(() => {
    console.log("TopBar name prop:", name);
  }, [name]);

  return (
    <div className="flex items-center justify-between bg-customPurple p-2 text-white fixed top-0 w-full z-10 h-12">
    
      <button onClick={toggleSidebar} className="md:hidden">
        <FaBars size={24} />
      </button>

   
      <div className="text-lg font-semibold font-sans">{name}</div>

     
      <div className="relative flex items-center max-w-xs flex-1">
        <FaSearch className="absolute left-3 text-gray-300" />
        <input
          type="text"
          placeholder="Search..."
          className="w-full pl-10 pr-4 py-2 rounded-md outline-none text-gray-700"
        />
        <div className="relative">
        
          <FaUserCircle
            className="text-white mx-2 cursor-pointer"
            size={30}
            onClick={handleUserIconClick}
          />

          {/* Dropdown */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-white text-black rounded-md shadow-lg">
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopBar;
