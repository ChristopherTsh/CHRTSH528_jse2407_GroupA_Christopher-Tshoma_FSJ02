"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation'; // Use useSearchParams from next/navigation
import { fetchProducts } from '../utils/api';
import ProductGrid from './ProductGrid';
import Pagination from './Pagination';

export default function ProductsClient({ searchParams: initialSearchParams }) {
  const { category = '', sort = '', search = '' } = initialSearchParams; // Rename searchParams to initialSearchParams
  const searchParams = useSearchParams(); // Get search params from the URL
  const currentPage = parseInt(searchParams.get('page'), 10) || 1; // Default to page 1
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const { products, total } = await fetchProducts({ category, sort, search });
      setProducts(products);
      setTotal(total);
    };

    fetchData().catch((error) => {
      console.error('Error in fetchData:', error);
    });
  }, [category, sort, search]);

  const handlePageChange = (newPage) => {
    window.history.pushState({}, '', `?page=${newPage}`); // Update the URL without reloading
    setCurrentPage(newPage); // Update the current page state
  };

  return (
    <div>
      {products.length > 0 ? (
        <ProductGrid products={products} />
      ) : (
        <p>No products found</p>
      )}
      <Pagination currentPage={currentPage} total={total} onPageChange={handlePageChange} />
      <p>Total Products: {total}</p>
    </div>
  );
}
