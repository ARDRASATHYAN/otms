import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import DataTable from './shared/Datatable';
import { fetchTransactionsData } from '../services/Transactionsdetailervice';
import { useParams } from 'react-router-dom';
import { fetchCancelledDatails } from '../services/CancelledDetailService';

const  CancelledDetails= () => {
  const token = localStorage.getItem('token');
  const BID = localStorage.getItem('bid');
  const [data, setData] = useState([]);
  const { id } = useParams();
 
    useEffect(() => {
      const fetchData = async () => {
        try {
        
          const result = await fetchCancelledDatails(BID, token,id);
          
      
          const xmlString = result.data;
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
  
          const rows = xmlDoc.getElementsByTagName('ROW');
          const parsedData = [];
        //   const nameSet = new Set();
  
          for (let i = 0; i < rows.length; i++) {
            const code = rows[i].getElementsByTagName('code')[0]?.textContent;
            const no = rows[i].getElementsByTagName('no')[0]?.textContent;
            const name= rows[i].getElementsByTagName('name')[0]?.textContent;
            const tdate = rows[i].getElementsByTagName('tdate')[0]?.textContent;
            const rno= rows[i].getElementsByTagName('rno')[0]?.textContent;
            const amount = rows[i].getElementsByTagName('amount')[0]?.textContent;
            const balance= rows[i].getElementsByTagName('balance')[0]?.textContent;
            const status = rows[i].getElementsByTagName('status')[0]?.textContent;
            const time = rows[i].getElementsByTagName('time')[0]?.textContent;
            if (name) {
              parsedData.push({ code, no,name,tdate,rno,amount,balance,status,time  });
            //   nameSet.add(name);
            }
          }
  
          setData(parsedData);
        //   setName(Array.from(nameSet));
        } catch (error) {
          console.error('Error fetching or parsing data:', error);
        }
      };

    fetchData();
  }, [token]);

  if (data.length === 0) {
    return <div>No data available.</div>;
  }

   

  return (
    <div>
    <div className="flex items-center gap-4 mb-4">
  <div className="font-semibold text-lg p-2">Transaction </div>

   
     
   </div>

      <div className="w-full">
     
        <DataTable columns={["code", "no","name","tdate","rno","amount","balance","status","time"]} data={data} />
      </div>
    </div>
  );
};

export default CancelledDetails;
