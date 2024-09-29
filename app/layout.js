"use client"; // Ensure this is a client component

import './globals.css';
import SearchBar from './components/SearchBar';
import CategoryFilter from './components/CategoryFilter';
import SortDropdown from './components/SortDropdown';
import MetaTags from './components/MetaTags';
import { useRouter } from 'next/navigation';

export default function RootLayout({ children }) {
  const router = useRouter();

  const handleSearch = (searchTerm) => {
    // Update the URL to go to /products instead of /
    router.push(`/products?search=${searchTerm}`);
  };

  return (
    <html lang="en">
      <head>
        <MetaTags title="E-commerce Store" description="A fully functional e-commerce store built with Next.js" />
      </head>
      <body>
        <header className="bg-gray-800 text-white p-4">
          <h1 className="text-3xl">My E-commerce Store</h1>
          <nav className="flex justify-between">
            <SearchBar onSearch={handleSearch} /> {/* Ensure onSearch is called properly in SearchBar */}
            <CategoryFilter />
            <SortDropdown />
          </nav>
        </header>
        <main className="p-4">{children}</main> {/* Render child components here */}
        <footer className="bg-gray-800 text-white text-center p-4">
          <p>© {new Date().getFullYear()} My E-commerce Store</p>
        </footer>
      </body>
    </html>
  );
}
