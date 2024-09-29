"use client" 

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ProductGrid from "./components/ProductGrid";
import SearchBar from "./components/SearchBar.js";
import CategoryFilter from "./components/CategoryFilter.js";
import PriceSort from "./components/SortDropdown.js";
import Loader from "./Loader";
import Custom404 from "../app/ErrorMessage";
import Pagination from "./components/Pagination";
import Footer from "./components/ErrorBoundary";

function HomePage() {
  const router = useRouter();
  const { query } = router;

  const productsPerPage = 20;
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [totalPages, setTotalPages] = useState(10);

  // Function to fetch products with search, filter, and sorting
  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      setHasError(false);

      const searchQuery = query.search || "";
      const selectedCategory = query.category || "";
      const sort = query.sort || "";
      const page = query.page || currentPage;

      const res = await fetch(
        `https://next-ecommerce-api.vercel.app/products?limit=${productsPerPage}&skip=${
          (page - 1) * productsPerPage
        }&search=${searchQuery}&category=${selectedCategory}&sort=${sort}`
      );

      if (!res.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await res.json();
      setProducts(data);
    } catch (error) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch products when the component mounts or query params change
  useEffect(() => {
    fetchProducts();
  }, [query]);

  return (
    <div>
      <Navbar />
      <SearchBar />
      <CategoryFilter categories={["Category1", "Category2"]} />
      <PriceSort />
      
      {isLoading ? <Loader /> : <ProductGrid products={products} />}
      
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
      <Footer />
    </div>
  );
}

export default HomePage;
