import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import DataTable from './shared/Datatable'; // Ensure this component is set up to display the data
import axios from 'axios';
import { fetchAgentData } from '../services/AgentServices';

const Agents = () => {
  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState(''); 
  const [data, setData] = useState([]);
  const [names, setNames] = useState([]); 

  const token = localStorage.getItem('token');
  const BID = localStorage.getItem('bid');

  useEffect(() => {
    const fetchData = async () => {
      try {
     
        const result = await fetchAgentData(BID, token);
  
        const xmlString = result.data;

        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlString, 'text/xml');

        // Check if there was a parsing error
        const parserError = xmlDoc.getElementsByTagName('parsererror');
        if (parserError.length > 0) {
          console.error('Error parsing XML:', parserError[0].textContent);
          return;
        }

        // Extract values from the XML
        const rows = xmlDoc.getElementsByTagName('ROW');
        const parsedData = [];
        const nameSet = new Set(); // Use a Set to store unique names

        for (let i = 0; i < rows.length; i++) {
          const id = rows[i].getElementsByTagName('id')[0]?.textContent;
          const name = rows[i].getElementsByTagName('name')[0]?.textContent;

          if (id && name) {
            parsedData.push({ id, name });
            nameSet.add(name); // Add name to the Set
          }
        }

        setData(parsedData); // Set the parsed data in the state
        setNames(Array.from(nameSet)); // Convert Set to Array and set it in state
      } catch (error) {
        console.error('Error fetching or parsing data:', error);
      }
    };

    fetchData();
  }, [token]);

  // Apply both filters: by selected name and search query
  const filteredData = data.filter(item => {
    const matchesName = filterType ? item.name === filterType : true;
    const matchesQuery = query ? item.name.toLowerCase().includes(query.toLowerCase()) : true;
    return matchesName && matchesQuery;
  });

  return (
    <div className="">
      <div className="flex items-center gap-4 mb-4">
        <div className="font-semibold text-lg p-2">Agents</div>

        {/* Dropdown  */}
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        >
          <option value="">All Names</option> 
          {names.map((name, index) => (
            <option key={index} value={name}>
              {name}
            </option>
          ))}
        </select>

        {/* Search  */}
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
       
        <DataTable columns={['ID', 'Name']} data={filteredData} />
      </div>
    </div>
    )
}



export default Agents;