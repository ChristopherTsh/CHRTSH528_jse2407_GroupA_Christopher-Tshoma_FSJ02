// app/layout.js
"use client";
import '../app/globals.css';
import { useEffect, useState } from "react";
import CategoryFilter from "./components/CategoryFilter";
import ProductGrid from "./components/ProductGrid";
import SearchBar from "./components/SearchBar";

export default function RootLayout({ children }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOption, setSortOption] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://next-ecommerce-api.vercel.app/products");
        const data = await response.json();
        setProducts(data);
        console.log("Fetched products:", data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

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

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setSortOption("asc");
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const displayedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
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
                onChange={(e) => setSortOption(e.target.value)}
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

          <ProductGrid products={displayedProducts} />

          <div className="flex justify-between items-center my-4">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 transition"
            >
              Previous
            </button>
            <span className="text-lg">Page {currentPage} of {totalPages}</span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 transition"
            >
              Next
            </button>
          </div>

          

          
        </div>
        {children}
      </body>
    </html>
  );
}
