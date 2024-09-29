"use client"; // This must be at the top

import '../app/globals.css';
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from 'next/navigation'; 
import Head from 'next/head';
import CategoryFilter from "./components/CategoryFilter";
import ProductGrid from "./components/ProductGrid";
import SearchBar from "./components/SearchBar";
import Loader from "./Loader";

// Footer component
function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-4 mt-8">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} Your Store Name. All rights reserved.</p>
      </div>
    </footer>
  );
}

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

export default function RootLayout({ children }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || "");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || "");
  const [sortOption, setSortOption] = useState(searchParams.get('sort') || "asc");
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page')) || 1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://next-ecommerce-api.vercel.app/products?limit=200`);
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      
      setProducts(data);
      setTotalPages(Math.ceil(data.length / 20)); // Calculate total pages based on the number of products
      applyFilters(data); // Apply filters after fetching data
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = (products) => {
    let filtered = products;

    if (searchQuery) {
      filtered = filtered.filter(product => product.title.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    if (sortOption === "asc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === "desc") {
      filtered.sort((a, b) => b.price - a.price);
    }

    // Paginate the filtered results
    const startIndex = (currentPage - 1) * 20;
    const paginatedProducts = filtered.slice(startIndex, startIndex + 20);

    setFilteredProducts(paginatedProducts);

    // Update the URL with search, category, sort, and page parameters
    const queryParams = new URLSearchParams({
      search: searchQuery,
      category: selectedCategory,
      sort: sortOption,
      page: currentPage.toString(),
    });

    router.push(`/products?${queryParams.toString()}`);
  };

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setSortOption("asc");
    setCurrentPage(1);
    router.push('/products'); // Reset URL
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Head>
        <title>Product List - Your Store Name</title>
        <meta name="description" content="Browse and shop for products at our online store." />
      </Head>
      <html lang="en">
        <body className="bg-gray-50 font-sans">
          <div className="max-w-7xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Product List</h1>

            <div className="flex flex-col md:flex-row md:justify-between mb-4">
              {/* Search bar */}
              <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
              
              {/* Category filter */}
              <CategoryFilter selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />

              <div className="flex space-x-4 mt-4 md:mt-0">
                <label htmlFor="sort" className="self-center">Sort by price:</label>
                <select
                  id="sort"
                  value={sortOption}
                  onChange={(e) => {
                    setSortOption(e.target.value);
                    router.push(`/products?search=${searchQuery}&category=${selectedCategory}&sort=${e.target.value}`);
                  }}
                  className="border border-gray-300 rounded-md p-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out shadow-sm"
                >
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </select>
              </div>
              <button
                onClick={resetFilters}
                className="bg-red-500 text-white rounded-md px-4 py-2 hover:bg-red-600 transition mb-4"
              >
                Reset Filters
              </button>
            </div>

            {loading && <Loader />}

            {!loading && (
              <>
                <ProductGrid products={filteredProducts} />

                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </>
            )}
          </div>

          {children}

          {/* Footer */}
          <Footer />
        </body>
      </html>
    </>
  );
}
