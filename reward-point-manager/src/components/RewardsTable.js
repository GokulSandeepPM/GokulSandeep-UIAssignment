/**
 * @fileoverview Rewards table component with pagination.
 */

import React, { useState, useMemo } from 'react';
import '../styles/RewardsTable.scss';

/**
 * Component to display rewards data in a paginated and responsive table.
 * @param {Object} props - Component properties.
 * @param {Array} props.data - Array of reward data to display.
 * @returns {JSX.Element} RewardsTable component.
 */
const RewardsTable = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(() => {
    const screenWidth = window.innerWidth;
    if (screenWidth < 576) return 5;
    if (screenWidth < 768) return 8;
    return 10;
  });

  const totalPages = Math.ceil(data.length / rowsPerPage);

  // Memoize paginated data to avoid recalculating on every render
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return data.slice(start, start + rowsPerPage);
  }, [data, currentPage, rowsPerPage]);

  const handlePageChange = (direction) => {
    setCurrentPage((prev) => {
      if (direction === 'next' && prev < totalPages) return prev + 1;
      if (direction === 'prev' && prev > 1) return prev - 1;
      return prev;
    });
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handleLastPage = () => {
    setCurrentPage(totalPages);
  };

  return (
    <div className="table-container">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Customer ID</th>
            <th>Year</th>
            <th>Month</th>
            <th>Total Points</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, index) => (
            <tr key={index}>
              <td>{row.customerId}</td>
              <td>{row.year}</td>
              <td>{row.month}</td>
              <td>{row.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination-controls">
        <button
         aria-label="First"
          className="btn btn-primary"
          disabled={currentPage === 1}
          onClick={handleFirstPage}
        >
          <i className="fas fa-angle-double-left"></i> 
        </button>
        <button
          aria-label="Previous"
          className="btn btn-primary"
          disabled={currentPage === 1}
          onClick={() => handlePageChange('prev')}
        >
          <i className="fas fa-angle-left"></i> 
        </button>
        <span className="page-info">
          Page {currentPage} of {totalPages}
        </span>
        <button
          aria-label="Next"
          className="btn btn-primary"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange('next')}
        >
          <i className="fas fa-angle-right"></i> 
        </button>
        <button
          aria-label="Last"
          className="btn btn-primary"
          disabled={currentPage === totalPages}
          onClick={handleLastPage}
        >
          <i className="fas fa-angle-double-right"></i>
        </button>
      </div>
    </div>
  );
};

export default RewardsTable;
