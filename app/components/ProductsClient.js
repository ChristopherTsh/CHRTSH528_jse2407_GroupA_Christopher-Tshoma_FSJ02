"use client";

import { useState, useEffect } from 'react';
import { fetchProducts } from '../utils/api';
import ProductGrid from './ProductGrid'; // Import your ProductGrid component

export default function ProductsClient({ searchParams }) {
  const { category = '', sort = '', search = '' } = searchParams;
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  
  // Fetch products whenever the searchParams or currentPage changes
  useEffect(() => {
    const fetchData = async () => {
      const { products, total } = await fetchProducts({ category, sort, search, page: currentPage, limit: 20 });
      console.log('Fetched Products:', products);
      console.log('Total Products:', total);
      setProducts(products);
      setTotal(total);
    };

    fetchData().catch((error) => {
      console.error('Error in fetchData:', error);
    });
  }, [category, sort, search, currentPage]);

  // Handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      {products.length > 0 ? (
        <ProductGrid products={products} />
      ) : (
        <p>No products found</p>
      )}
      <div className="pagination">
        {/* Pagination controls */}
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage * 20 >= total}>
          Next
        </button>
      </div>
      <p>Total Products: {total}</p>
    </div>
  );
}
