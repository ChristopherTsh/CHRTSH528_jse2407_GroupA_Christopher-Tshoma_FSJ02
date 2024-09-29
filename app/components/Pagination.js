// Pagination component
function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="flex justify-between items-center">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="bg-gray-300 text-black px-4 py-2 rounded-md disabled:opacity-50"
      >
        Previous
      </button>
      <span className="text-gray-700">
        Page {currentPage} of {totalPages}
      </span>
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="bg-gray-300 text-black px-4 py-2 rounded-md disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}