'use client';

import React, { useEffect, useState } from 'react';
import ProductGrid from './ProductGrid';

const ProductsClient = ({ searchParams }) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  const { category = '', sort = '', search = '' } = searchParams || {};

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `https://next-ecommerce-api.vercel.app/products?category=${category}&sort=${sort}&search=${search}&limit=50`
        );

        console.log("Fetching products with params:", { category, sort, search });
        console.log("API Response Status:", response.status);

        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }

        const productList = await response.json();
        console.log("Full API Response:", productList);

        if (!Array.isArray(productList) || productList.length === 0) {
          console.error('No products found in API response.');
          setProducts([]);
        } else {
          setProducts(productList);
        }
      } catch (error) {
        console.error("Error in ProductsClient:", error.message);
        setError(error.message);
      }
    };

    fetchProducts();
  }, [category, sort, search]);

  if (error) {
    return <div>Error loading products: {error}</div>;
  }

  if (!Array.isArray(products) || products.length === 0) {
    return <div>No products found.</div>;
  }

  return (
    <div>
      <ProductGrid products={products} />
    </div>
  );
};

export default ProductsClient;
