'use client'; // This makes the component a Client Component

import { useSearchParams } from 'next/navigation';
import SearchBar from './SearchBar';
import CategoryFilter from './CategoryFilter';
import Pagination from './Pagination';
import ProductGrid from './ProductGrid';
import SortOptions from './SortOptions'; 
import ResetButton from './ResetButton'; 
import { useEffect, useState } from 'react';

export default function ProductsClient({ products }) {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || "");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || "");
  const [sortOption, setSortOption] = useState(searchParams.get('sort') || "asc");
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page')) || 1);
  const [totalPages, setTotalPages] = useState(1);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const applyFilters = () => {
      let filtered = products;

      if (searchQuery) {
        filtered = filtered.filter(product => 
          product.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      if (selectedCategory) {
        filtered = filtered.filter(product => 
          product.category === selectedCategory
        );
      }

      if (sortOption === "asc") {
        filtered.sort((a, b) => a.price - b.price);
      } else if (sortOption === "desc") {
        filtered.sort((a, b) => b.price - a.price);
      }

      const pages = Math.ceil(filtered.length / 20); 
      setTotalPages(pages);
      const startIndex = (currentPage - 1) * 20;
      setFilteredProducts(filtered.slice(startIndex, startIndex + 20));
    };

    applyFilters();
  }, [products, searchQuery, selectedCategory, sortOption, currentPage]);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setSortOption("asc");
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set('page', page);
    window.history.pushState({}, '', `${window.location.pathname}?${newParams}`);
    setCurrentPage(page);
  };

  return (
    <>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <CategoryFilter selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      <SortOptions sortOption={sortOption} setSortOption={setSortOption} />
      <ResetButton resetFilters={resetFilters} /> {/* Reset Button */}
      <ProductGrid products={filteredProducts} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
}
