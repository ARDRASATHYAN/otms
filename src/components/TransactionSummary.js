import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import DataTable from './shared/Datatable'; // Ensure this path is correct
import { fetchTransactionData } from '../services/TransactionService';
import { useNavigate } from 'react-router-dom';

const TransactionSummary = () => {
  const token = localStorage.getItem('token');
  const BID = localStorage.getItem('bid');
  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState(''); // Initialize as an empty string
  const [data, setData] = useState([]);
  const [name, setName] = useState([]); // State to hold unique names for dropdown
const navigate=useNavigate()
 
    useEffect(() => {
      const fetchData = async () => {
        try {
          // Call the API service to fetch data
          const result = await fetchTransactionData(BID, token);
          
          // Extract the XML string from the response
          const xmlString = result.data;
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
  
          const rows = xmlDoc.getElementsByTagName('ROW');
          const parsedData = [];
          const nameSet = new Set();
  
          for (let i = 0; i < rows.length; i++) {
            const id = rows[i].getElementsByTagName('id')[0]?.textContent;
            const name = rows[i].getElementsByTagName('name')[0]?.textContent;
            const mobile = rows[i].getElementsByTagName('mobile')[0]?.textContent;
            const cnt = rows[i].getElementsByTagName('cnt')[0]?.textContent;
            const tamt = rows[i].getElementsByTagName('tamt')[0]?.textContent;
            if (name) {
              parsedData.push({ id, name, mobile, cnt, tamt });
              nameSet.add(name);
            }
          }
  
          setData(parsedData);
          setName(Array.from(nameSet));
        } catch (error) {
          console.error('Error fetching or parsing data:', error);
        }
      };

    fetchData();
  }, [token]);

  if (data.length === 0) {
    return <div>No data available.</div>;
  }
   // Apply both filters: by selected name and search query
   const filteredData = data.filter(item => {
    const matchesName = filterType ? item.name === filterType : true;
    const matchesQuery = query ? item.name.toLowerCase().includes(query.toLowerCase()) : true;
    return matchesName && matchesQuery;
  });
  const handleNameClick = (id) => {
    navigate(`/transaction/${id}`); // Navigate to the detail page with the ID
  };

  return (
    <div>
    <div className="flex items-center gap-4 mb-4">
  <div className="font-semibold text-lg p-2">Transaction Summary Summary</div>

   {/* Dropdown to select a code */}
   <select
       value={filterType}
       onChange={(e) => setFilterType(e.target.value)}
       className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
     >
       <option value="">All Names</option> {/* Option to show all data */}
       {name.map((name, index) => (
         <option key={index} value={name}>
           {name}
         </option>
       ))}
     </select>

     {/* Search Input */}
     <div className="relative">
       <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300" />
       <input
         type="text"
         value={query}
         onChange={(e) => setQuery(e.target.value)}
         placeholder="Search..."
         className="pl-10 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
       />
     </div>
   </div>

      <div className="w-full">
        {/* Pass the full data to DataTable */}
        <DataTable columns={['id', 'name', 'mobile','cnt' ,'tamt']}  data={filteredData.map((item) => ({
            ...item,
            name: (
              <span
                className="text-blue-500 cursor-pointer"
                onClick={() => handleNameClick(item.id)} // Handle click to navigate
              >
                {item.name}
              </span>
            ),
          }))}
        />
      </div>
    </div>
  );
};

export default TransactionSummary;
