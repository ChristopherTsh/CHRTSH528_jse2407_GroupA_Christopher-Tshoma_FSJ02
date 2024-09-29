'use client';

import SearchBar from './SearchBar';
import CategoryFilter from './CategoryFilter';
import SortDropdown from './SortDropdown';
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();

  const handleReset = () => {
    router.push({
      pathname: '/products',
      query: {} // Clear all query params
    });
  };
  

  return (
    <header className="bg-gray-800 text-white p-4">
      <h1 className="text-3xl">My E-commerce Store</h1>
      <nav className="flex justify-between space-x-4">
        <SearchBar />
        <CategoryFilter />
        <SortDropdown />
        <button onClick={handleReset} className="bg-red-500 text-white p-2 rounded">Reset</button>
      </nav>
    </header>
  );
}
