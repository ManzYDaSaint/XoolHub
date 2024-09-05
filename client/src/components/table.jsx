import React, { useState, useEffect } from 'react';
import Searchbar from './input/searchbar';

function UniversalTable({ columns, data }) {
  const [sortedData, setSortedData] = useState(data);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');

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
  };

  return (
    <div className="helperDiv">
    <Searchbar 
        icon={'search'}
        type={'text'}
        placeholder={'Search by keyword'}
        value={searchTerm}
        onChange={handleSearch}
    />
    <table className="table customisedTable">
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th key={index} onClick={() => handleSort(column.key)}>
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
        {sortedData.map((row, index) => (
            <tr key={index}>
              {columns.map((column, index) => (
                <td key={index}>{row[column.key]}</td>
              ))}
            </tr>
          ))}
      </tbody>
    </table>
    </div>
  );
}

export default UniversalTable;