import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import DataTable from './shared/Datatable'; 

import { fetchAccountData } from '../services/AccountService';

const Account_Summery = () => {
    const [query, setQuery] = useState('');
    const [filterType, setFilterType] = useState(''); 
    const [data, setData] = useState([]);
    const [code, setCode] = useState([]);
//get the localstorage data
    const token = localStorage.getItem('token');
    const BID = localStorage.getItem('bid');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchAccountData(BID, token);
        const xmlString = result.data;
        console.log('XML string:', xmlString);

        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlString, 'text/xml');

        const rows = xmlDoc.getElementsByTagName('ROW');
        const parsedData = [];
        const codeSet = new Set();

        for (let i = 0; i < rows.length; i++) {
          const code = rows[i].getElementsByTagName('code')[0]?.textContent;
          const description = rows[i].getElementsByTagName('description')[0]?.textContent;
          const cnt = rows[i].getElementsByTagName('cnt')[0]?.textContent;
          const tamt = rows[i].getElementsByTagName('tamt')[0]?.textContent;

          if (code) {
            parsedData.push({ code, description, cnt, tamt });
            codeSet.add(code); 
          }
        }

        setData(parsedData);
        setCode(Array.from(codeSet)); 
      } catch (error) {
        console.error('Error fetching or parsing data:', error);
      }
    };

    fetchData();
  }, [token]);

  if (data.length === 0) {
    return <div>No data available.</div>;
  }

 
  const filteredData = data.filter(item => {
    const matchesName = filterType ? item.code === filterType : true;
    const matchesQuery = query ? item.code.toLowerCase().includes(query.toLowerCase()) : true;
    return matchesName && matchesQuery;
  });

  return (
    <div>
     <div className="flex items-center gap-4 mb-4">
     <div className="font-semibold text-lg p-2">Account Summary</div>

     
      <select
        value={filterType}
        onChange={(e) => setFilterType(e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
      >
        <option value="">All Codes</option> 
        {code.map((codeValue, index) => (
          <option key={index} value={codeValue}>
            {codeValue}
          </option>
        ))}
      </select>


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
      
        <DataTable columns={['code', 'description', 'cnt', 'tamt']} data={filteredData} />
      </div>
    </div>
  );
};



export default Account_Summery;