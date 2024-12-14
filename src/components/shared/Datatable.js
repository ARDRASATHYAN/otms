import React, { useState } from 'react';

const DataTable = ({ data, columns }) => {
  console.log("Data received in props:", data);

  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 10;


  const totalPages = Math.ceil(data.length / entriesPerPage);

  
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentData = data.slice(indexOfFirstEntry, indexOfLastEntry);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  console.log('Data passed to DataTable:', data);
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead >
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider border-b border-r border-gray-200"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentData.map((row, rowIndex) => (
            <tr key={rowIndex} > 
              {columns.map((column, colIndex) => (
                <td
                  key={colIndex}
                  className="px-6 py-2 text-sm text-gray-700 border-b border-r border-gray-200"
                >
                  {row[column.toLowerCase()]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

   
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
          className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-sm text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
          className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DataTable;
