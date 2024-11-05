import React, { useEffect, useState } from 'react';
import TopBar from './shared/TopBar';
import Sidebar from './shared/Sidebar';
import MainContent from './shared/MainContent';
import axios from 'axios';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [data, setData] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          'https://fc.maxence.co.in/v1/bank/info', 
          JSON.stringify({ id: "F1264" }),
          {
            headers: {  
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json' 
            } 
          }
        );
        setData(response.data); 
        setLoading(false);
        console.log('Fetched data:', response.data); 
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false); 
      }
    };

    fetchData();
  }, [token]);

  return (
    <div className="flex flex-col h-screen">
     
      
        <TopBar toggleSidebar={toggleSidebar} name={data?.data.name} />
      
   
      <div className="flex flex-1 mt-4 md:mt-0">
     
        <div className={`bg-white text-blue-800 w-64 h-full p-10 shadow-lg transition-transform duration-300 ${sidebarOpen ? 'block' : 'hidden'} md:block`}>
          <Sidebar isOpen={sidebarOpen} />
        </div>

        
        <div className="flex-1 p-10 transition-all duration-300">
          {loading ? <p>Loading content...</p> : <MainContent />}
        </div>
      </div>
    </div>
  );
};

export default Layout;
