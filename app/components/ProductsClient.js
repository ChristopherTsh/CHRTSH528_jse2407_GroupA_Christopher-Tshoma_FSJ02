'use client'; // This makes the component a Client Component

import { useSearchParams } from 'next/navigation';
import SearchBar from './SearchBar';
import CategoryFilter from './CategoryFilter';
import Pagination from './Pagination';
import ProductGrid from './ProductGrid';
import SortOptions from './SortOptions'; // Import your SortOptions component
import { useEffect, useState } from 'react';

export default function ProductsClient({ products }) {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search') || "";
  const selectedCategory = searchParams.get('category') || "";
  const sortOption = searchParams.get('sort') || "asc";
  const currentPage = parseInt(searchParams.get('page')) || 1;

  const [totalPages, setTotalPages] = useState(1);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const applyFilters = () => {
      let filtered = products;

      // Apply search filter
      if (searchQuery) {
        filtered = filtered.filter(product => 
          product.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      // Apply category filter
      if (selectedCategory) {
        filtered = filtered.filter(product => 
          product.category === selectedCategory
        );
      }

      // Apply sorting
      if (sortOption === "asc") {
        filtered.sort((a, b) => a.price - b.price);
      } else if (sortOption === "desc") {
        filtered.sort((a, b) => b.price - a.price);
      }

      // Calculate total pages
      const pages = Math.ceil(filtered.length / 20); // Assuming 20 products per page
      setTotalPages(pages);

      // Paginate the filtered results
      const startIndex = (currentPage - 1) * 20;
      setFilteredProducts(filtered.slice(startIndex, startIndex + 20));
    };

    applyFilters();
  }, [products, searchQuery, selectedCategory, sortOption, currentPage]); // Add dependencies to the effect

  const handlePageChange = (page) => {
    // Update the current page in the search params
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set('page', page);
    window.history.pushState({}, '', `${window.location.pathname}?${newParams}`);
    setCurrentPage(page);
  };

  return (
    <>
      <SearchBar searchQuery={searchQuery} />
      <CategoryFilter selectedCategory={selectedCategory} />
      <SortOptions currentSort={sortOption} /> {/* Add SortOptions here */}
      <ProductGrid products={filteredProducts} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange} // Pass the function here
      />
    </>
  );
}
