import React, { useState, useEffect } from "react";
import Searchbar from "./input/searchbar";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "jspdf-autotable";

function UniversalTable({ columns, data }) {
  const [sortedData, setSortedData] = useState(data);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 20;

  useEffect(() => {
    setSortedData(data);
  }, [data]);

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }

    const sortedData = [...data].sort((a, b) => {
      const aValue = a[column];
      const bValue = b[column];

      if (typeof aValue === "string") {
        return aValue.localeCompare(bValue, undefined, { sensitivity: "base" });
      } else if (typeof aValue === "number") {
        return aValue - bValue;
      } else {
        return 0;
      }
    });

    if (sortOrder === "desc") {
      sortedData.reverse();
    }

    setSortedData(sortedData);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);

    const filteredData = data.filter((row) => {
      const searchValue = event.target.value.toLowerCase();
      return Object.values(row).some(
        (value) =>
          typeof value === "string" && value.toLowerCase().includes(searchValue)
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

  /** ========== EXPORT FUNCTIONS ========== **/
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(sortedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "TableData");
    XLSX.writeFile(workbook, "table-data.xlsx");
  };

  const exportToCSV = () => {
    const header = columns.map((col) => col.label).join(",") + "\n";
    const rows = sortedData
      .map((row) => columns.map((col) => row[col.key]).join(","))
      .join("\n");
    const csv = header + rows;

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "table-data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToPDF = () => {
    const doc = new jsPDF();

    const tableColumn = columns.map((col) => col.label);
    const tableRows = sortedData.map((row) =>
      columns.map((col) => {
        const value = row[col.key];
        if (value === null || value === undefined) return ""; // ensure valid type
        return String(value); // force everything into a string for safety
      })
    );

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
    });

    doc.save("table-data.pdf");
  };

  return (
    <div className="w-full space-y-4">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <p className="text-sm font-medium text-gray-700 mb-4">
          Note:{" "}
          <span className="text-gray-600">
            Click on any column header to sort in{" "}
            <strong>ascending</strong> and <strong>descending</strong> order.
            Default is unsorted.
          </span>
        </p>
        
        {/* Search + Export Buttons */}
        <div className="flex items-center justify-between mb-6">
          <Searchbar
            type={"text"}
            placeholder={"Search by keyword"}
            value={searchTerm}
            onChange={handleSearch}
          />
          <div className="flex gap-2">
            <button
              onClick={exportToExcel}
              className="bg-green-600 hover:bg-green-700 cursor-pointer text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Excel
            </button>
            <button
              onClick={exportToCSV}
              className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              CSV
            </button>
            <button
              onClick={exportToPDF}
              className="bg-red-600 hover:bg-red-700 cursor-pointer text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              PDF
            </button>
          </div>
        </div>
        
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {columns.map((column, index) => (
                  <th
                    key={index}
                    onClick={() => handleSort(column.key)}
                    style={{ width: column.width, textAlign: column.textAlign }}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      {column.label}
                      {sortColumn === column.key && (
                        <span className="text-gray-400">
                          {sortOrder === "asc" ? "▲" : "▼"}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedData.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  {columns.map((column, index) => (
                    <td
                      key={index}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                    >
                      {row[column.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="flex items-center justify-between px-6 border-t border-gray-200 py-4">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              currentPage === 1
                ? "text-gray-400 cursor-not-allowed bg-gray-100"
                : "text-gray-700 hover:bg-gray-100 border border-gray-300 hover:border-gray-400"
            }`}
          >
            Previous
          </button>
          
          <div className="flex gap-1">
            {pageNumbers.map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => handlePageClick(pageNumber)}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  pageNumber === currentPage
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-100 border border-gray-300 hover:border-gray-400"
                }`}
              >
                {pageNumber}
              </button>
            ))}
          </div>
          
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              currentPage === totalPages
                ? "text-gray-400 cursor-not-allowed bg-gray-100"
                : "text-gray-700 hover:bg-gray-100 border border-gray-300 hover:border-gray-400"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default UniversalTable;
