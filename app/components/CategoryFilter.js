"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CategoryFilter() {
  const [category, setCategory] = useState('');
  const router = useRouter();

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    console.log("Selected category:", selectedCategory);
    setCategory(selectedCategory);
    router.push(`/products?category=${selectedCategory}`);
  };

  return (
    <div>
      <select value={category} onChange={handleCategoryChange} className="border p-2 rounded">
        <option value="">All Categories</option>
        <option value="electronics">Electronics</option>
        <option value="fashion">Fashion</option>
        {/* Add more categories as needed */}
      </select>
    </div>
  );
}
