// Pagination.js
"use client";
import { useRouter } from 'next/navigation';

/**
 * Pagination component that provides navigation between pages of products.
 *
 * @param {Object} props - The component props
 * @param {number} props.currentPage - The current page number
 * @param {number} props.total - The total number of products
 * @param {Function} props.onPageChange - Function to handle the page change
 * @returns {JSX.Element} The Pagination component
 */
const Pagination = ({ currentPage, total, onPageChange }) => {
  const router = useRouter();
  const totalPages = Math.ceil(total / 20);

  const handlePreviousPage = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className="flex justify-center items-center mt-4">
      <button
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
        className={`px-4 py-2 mx-2 text-white bg-blue-500 rounded ${currentPage === 1 ? 'opacity-50' : ''}`}
      >
        Previous
      </button>
      <span className="text-lg">Page {currentPage} of {totalPages}</span>
      <button
        onClick={handleNextPage}
        disabled={currentPage >= totalPages}
        className={`px-4 py-2 mx-2 text-white bg-blue-500 rounded ${currentPage >= totalPages ? 'opacity-50' : ''}`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
