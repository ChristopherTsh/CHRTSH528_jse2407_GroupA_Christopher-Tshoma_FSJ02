"use client"; // This must be at the top

import '../app/globals.css';
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'; // Make sure to import from 'next/navigation'
import Head from 'next/head';
import CategoryFilter from "./components/CategoryFilter";
import ProductGrid from "./components/ProductGrid";
import SearchBar from "./components/SearchBar";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";

export default function RootLayout({ children }) {
  const router = useRouter(); // Use router in a client component
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOption, setSortOption] = useState("asc");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  // Function to fetch all products, accounting for pagination limits
  const fetchProducts = async () => {
    setLoading(true);
    setError(false);

    let allProducts = [];
    let page = 1;
    const pageSize = 20; // Assume the API returns 20 products per page

    try {
      // First check if the API supports a "limit" parameter to get all products at once
      const response = await fetch("https://next-ecommerce-api.vercel.app/products?limit=200");
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      } else {
        // If no "limit" is supported, fallback to manual pagination
        while (true) {
          const pageResponse = await fetch(`https://next-ecommerce-api.vercel.app/products?page=${page}&pageSize=${pageSize}`);
          if (!pageResponse.ok) throw new Error('Network response was not ok');
          const pageData = await pageResponse.json();
          if (pageData.length === 0) break; // Stop if no more products
          allProducts = [...allProducts, ...pageData];
          page += 1; // Increment page number
        }

        setProducts(allProducts);
        setFilteredProducts(allProducts);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // Filter and sort logic
  useEffect(() => {
    const applyFilters = () => {
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

      setFilteredProducts(filtered);
    };

    applyFilters();
  }, [products, searchQuery, selectedCategory, sortOption]);

  // Reset filters function
  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setSortOption("asc");
    router.push('/products'); // Reset URL parameters
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
              <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
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
            {error && <ErrorMessage message="Error fetching products. Please try again later." />}
            {!loading && !error && (
              <>
                <ProductGrid products={filteredProducts} />

                <div className="flex justify-between items-center my-4">
                  {/* Pagination controls can go here */}
                </div>
              </>
            )}
          </div>
          {children}
        </body>
      </html>
    </>
  );
}
