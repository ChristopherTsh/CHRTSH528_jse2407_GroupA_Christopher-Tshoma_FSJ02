// Pagination.js
"use client";
import { useRouter } from 'next/navigation';

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
