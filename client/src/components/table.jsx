import React, { useState, useEffect } from 'react';
import Searchbar from './input/searchbar';

function UniversalTable({ columns, data }) {
  const [sortedData, setSortedData] = useState(data);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 20;

  useEffect(() => {
    setSortedData(data);
  }, [data]);

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }

    const sortedData = [...data].sort((a, b) => {
      const aValue = a[column];
      const bValue = b[column];

      if (typeof aValue === 'string') {
        return aValue.localeCompare(bValue, undefined, { sensitivity: 'base' });
      } else if (typeof aValue === 'number') {
        return aValue - bValue;
      } else {
        return 0;
      }
    });

    if (sortOrder === 'desc') {
      sortedData.reverse();
    }

    setSortedData(sortedData);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);

    const filteredData = data.filter((row) => {
      const searchValue = event.target.value.toLowerCase();
      return Object.values(row).some((value) =>
        typeof value === 'string' && value.toLowerCase().includes(searchValue)
      );
    });

    setSortedData(filteredData);
    setCurrentPage(1); // Reset to the first page after a search
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(sortedData.length / recordsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const paginatedData = sortedData.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  const totalPages = Math.ceil(sortedData.length / recordsPerPage);
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="helperDiv">
      <p className='table_note'>Note: <span className='highlight'>Click on any of the column name to sort in <br /> both <strong>ascending</strong> and <strong>descending</strong> order. Default is unsorted.</span></p>
      <Searchbar 
        type={'text'}
        placeholder={'Search by keyword'}
        value={searchTerm}
        onChange={handleSearch}
      />
      <table className="table customisedTable">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index} onClick={() => handleSort(column.key)} style={{ width: column.width, textAlign: column.textAlign }} className='py-3 px-3 text-left'>
                {column.label}
                {sortColumn === column && (
                  <span className="sort-icon">
                    {sortOrder === 'asc' ? '▲' : '▼'}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, index) => (
            <tr key={index}>
              {columns.map((column, index) => (
                <td key={index} className='py-2 px-3 text-left'>{row[column.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination flex align-center my-5">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Prev
        </button>
        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageClick(pageNumber)}
            className={pageNumber === currentPage ? 'active-page' : ''}
          >
            {pageNumber}
          </button>
        ))}
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}

export default UniversalTable;

