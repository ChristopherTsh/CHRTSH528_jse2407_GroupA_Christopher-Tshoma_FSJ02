"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import config from '../utils/config'; // Import config to get the API base URL

export default function CategoryFilter() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const router = useRouter();

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch(`${config.apiBaseUrl}/categories`);
        if (!res.ok) throw new Error('Failed to fetch categories');
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        setCategories([]);
      }
    }
    fetchCategories();
  }, []);

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    router.push(`/products?category=${category}`);
  };

  return (
    <select value={selectedCategory} onChange={handleCategoryChange} className="border p-2 rounded">
      <option value="">All Categories</option>
      {categories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  );
}
