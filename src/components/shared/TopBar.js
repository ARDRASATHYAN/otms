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
    setDropdownOpen(!dropdownOpen);
  };

//  remove localhost data
  const handleLogout = () => {
    console.log("Logout clicked");
    localStorage.removeItem("token");
    localStorage.removeItem("bid");
    localStorage.removeItem("bankname");
    localStorage.removeItem('username');
    localStorage.removeItem('tokenExpiration');
    window.location.reload();
  };



  return (
    <div className="flex items-center justify-between bg-customPurple p-2 text-white fixed top-0 w-full z-10 h-12">
     
      <button onClick={toggleSidebar} className="md:hidden">
        <FaBars size={24} />
      </button>

  
      <div className="text-lg font-semibold font-sans">{bankname}</div>

      <div className="relative">
        <FaUserCircle
          className="text-white mx-2 cursor-pointer"
          size={30}
          onClick={handleUserIconClick}
        /><span className="text-white mx-2 font-medium">{username}</span>

      
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-32 bg-white text-black rounded-md shadow-lg">
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Logout
            </button>
            <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
             <a href='/validatepin'> Pin Change</a>
             
            </button>
            <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
              <a href='/changepassword'>Password Change</a>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopBar;
