/**
 * Pagination component for navigating through pages of content.
 * It provides "Previous" and "Next" buttons and displays the current page
 * along with the total number of pages. The buttons are disabled when the user
 * is on the first or last page.
 *
 * @component
 * @param {Object} props - Props for the Pagination component.
 * @param {number} props.currentPage - The current active page.
 * @param {Function} props.handleNextPage - Function to handle moving to the next page.
 * @param {Function} props.handlePreviousPage - Function to handle moving to the previous page.
 * @param {number} props.totalPages - Total number of available pages.
 * 
 * @example
 * return (
 *   <Pagination
 *     currentPage={1}
 *     handleNextPage={() => goToNextPage()}
 *     handlePreviousPage={() => goToPreviousPage()}
 *     totalPages={10}
 *   />
 * )
 *
 * @returns {JSX.Element} The Pagination component with navigation buttons and page display.
 */
"use client";

export default function Pagination({
  currentPage,
  handleNextPage,
  handlePreviousPage,
  totalPages,
}) {
  return (
    <div className="flex justify-between bg-green-900 items-center mt-6 p-6">
      <button
        onClick={handlePreviousPage}
        disabled={currentPage === 1} // Disable if on the first page
        className={`min-w-[200px] px-4 py-3 bg-yellow-300 hover:bg-yellow-400 text-black text-sm font-semibold rounded ${
          currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        Previous
      </button>

      {/* Display the current page out of total pages */}
      <h1>
      <span className="text-black ">
        Page {currentPage} of {totalPages}
      </span>
      </h1>
      
      <button
        onClick={handleNextPage}
        className={`min-w-[200px] px-4 py-3 bg-yellow-300 hover:bg-yellow-400 text-black text-sm font-semibold rounded ${
          currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={currentPage === totalPages} // Disable if on the last page
      >
        Next
      </button>
    </div>
  );
}
