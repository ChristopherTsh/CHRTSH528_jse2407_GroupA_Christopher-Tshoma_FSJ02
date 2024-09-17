"use client";
import { useState, useEffect } from "react";
import ProductGrid from "./components/ProductGrid";
import Navbar from "./components/Navbar";
import Loader from "./Loader"; // Import your loader component
import Custom404 from "../app/ErrorMessage"; // Import your 404 component
import Pagination from "./components/Pagination"; // Import the new Pagination component
import Footer from "./components/Footer";

/**
 * HomePage component renders the main page of the application.
 *
 * It handles fetching products from an API, managing loading and error states,
 * and rendering the product grid, pagination controls, and other components.
 *
 * @returns {JSX.Element} The HomePage component
 */
export default function HomePage() {
  const productsPerPage = 20; // Number of products to display per page
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [products, setProducts] = useState([]); // Array of products fetched from the API
  const [filteredProducts, setFilteredProducts] = useState([]); // Array for storing filtered products (search results)
  const [isLoading, setIsLoading] = useState(true); // For loading state
  const [hasError, setHasError] = useState(false); // For error state
  const [totalPages, setTotalPages] = useState(10); // Set a total number of pages (adjust as needed)

  /**
   * Fetches products from the API based on the current page.
   *
   * @param {number} page - The page number to fetch products for
   */
  const fetchProducts = async (page) => {
    try {
      setIsLoading(true);
      setHasError(false); // Reset error state before new fetch
      const res = await fetch(
        `https://next-ecommerce-api.vercel.app/products?limit=${productsPerPage}&skip=${
          (page - 1) * productsPerPage
        }`
      );

      if (!res.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await res.json();
      setProducts(data); // Store the fetched products
      setFilteredProducts(data); // Set initial filtered products to match all fetched products
    } catch (error) {
      console.error("Error fetching products:", error);
      setHasError(true); // Set error state if something goes wrong
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch products when the component mounts and when currentPage changes
  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  // Handlers for pagination
  /**
   * Moves to the next page, respecting the total number of pages.
   */
  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  /**
   * Moves to the previous page, ensuring the page is greater than 1.
   */
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  /**
   * Filters products by their title based on the search term.
   *
   * @param {string} searchTerm - The search term entered by the user.
   */
  const searchProducts = (searchTerm) => {
    if (searchTerm.trim() === "") {
      setFilteredProducts(products); // If search is cleared, reset to all products
    } else {
      const filtered = products.filter((product) =>
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered); // Update the list with filtered products
    }
  };

  // Conditionally render content
  if (hasError) {
    return <Custom404 />; // Render the 404 page if there's an error
  }

  return (
    <div>
      <Navbar searchProducts={searchProducts} />

      {isLoading ? (
        <Loader />
      ) : (
        <ProductGrid products={filteredProducts} /> // Use filtered products for display
      )}

      {/* Use Pagination Component */}
      <Pagination
        currentPage={currentPage}
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
        totalPages={totalPages} // Pass the total pages for disabling buttons when needed
      />

      <Footer />
    </div>
  );
}
