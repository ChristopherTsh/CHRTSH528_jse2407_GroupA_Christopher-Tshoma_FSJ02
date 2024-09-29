"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SortDropdown() {
  const [sort, setSort] = useState('');
  const router = useRouter();

  const handleSortChange = (e) => {
    const selectedSort = e.target.value;
    setSort(selectedSort);
    router.push(`/products?sort=${selectedSort}`);
  };

  const resetFilters = () => {
    router.push(`/products`);
  };

  return (
    <div className="flex space-x-4 text-bg-green-700">
      <select value={sort} onChange={handleSortChange} className="border p-2 rounded">
        <option value="">Sort by</option>
        <option value="asc">Price: Low to High</option>
        <option value="desc">Price: High to Low</option>
      </select>
      <button onClick={resetFilters} className="border p-2 rounded bg-red-500 text-white">
        Reset Filters
      </button>
    </div>
  );
}
