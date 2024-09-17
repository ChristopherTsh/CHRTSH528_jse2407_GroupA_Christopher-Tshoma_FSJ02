/**
 * Navbar component with a toggleable mobile menu, search bar, and links to
 * Cart, Wishlist, and Profile pages. The component includes a hamburger menu
 * for mobile view and a search bar for product searching.
 *
 * @component
 * @example
 * return (
 *   <Navbar searchProducts={searchProductsFunction} />
 * )
 *
 * @param {function} searchProducts - Function to handle product search by title.
 * @returns {JSX.Element} The navigation bar with toggleable mobile menu, search bar, and links.
 */
"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar({ searchProducts }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  /**
   * Handles the search functionality by invoking the searchProducts function
   * with the current search term as input.
   *
   * @param {Event} e - The form submission event.
   */
  const handleSearch = (e) => {
    e.preventDefault();
    searchProducts(searchTerm); // Triggers the search
  };

  /**
   * Toggles the state of the mobile menu between open and closed.
   */
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="flex flex-col shadow-sm bg-green-900 font-sans min-h-[70px]">
      <div className="flex flex-wrap items-center justify-between sm:px-10 px-6 py-3 relative lg:gap-y-4 gap-y-6 gap-x-4 w-full">
        {/* Left Section: Toggle Button & Logo */}
        <div className="flex">
          <button id="toggleOpen" onClick={toggleMenu}>
            <svg
              className="w-7 h-7"
              fill="#000"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>

        {/* Search Bar */}
        <form
          onSubmit={handleSearch} // Use form tag for submission
          className="bg-gray-100 flex border-2 rounded max-md:order-1 border-transparent focus-within:border-blue-500 focus-within:bg-transparent px-4 h-11 lg:w-2/4 max-md:w-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 192.904 192.904"
            width="16px"
            className="fill-gray-400 mr-4 rotate-90"
          >
            <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
          </svg>

          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products..."
            className="w-full outline-none bg-transparent text-[#333] text-sm"
          />
          <button
            type="submit"
            className="min-w-[150px] px-4 py-3 bg-yellow-300 hover:bg-yellow-400 text-black text-sm font-semibold rounded"
          >
            Search
          </button>
        </form>

        {/* Cart, Wishlist, and User Menu */}
        <div className="flex items-center space-x-8 max-md:ml-auto">
          <Link href="/cart">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20px"
              className="cursor-pointer fill-[#333] hover:fill-[#077bff]"
              viewBox="0 0 511 511.999"
            >
              <path d="M498.7 222.695c-.016-.011-.028-.027-.04-.039L289.805 13.81C280.902 4.902 269.066 0 256.477 0c-12.59 0-24.426 4.902-33.332 13.809L14.398 222.55c-.07.07-.144.144-.21.215-18.282 18.386-18.25 48.218.09 66.558 8.378 8.383 19.44 13.235 31.273 13.746.484.047.969.07 1.457.07h8.32v153.696c0 30.418 24.75 55.164 55.168 55.164h81.711c8.285 0 15-6.719 15-15V376.5c0-13.879 11.293-25.168 25.172-25.168h48.195c13.88 0 25.168 11.29 25.168 25.168V497c0 8.281 6.715 15 15 15h81.711c30.422 0 55.168-24.746 55.168-55.164V303.14h7.719c12.586 0 24.422-4.903 33.332-13.813 18.36-18.367 18.367-48.254.027-66.633zm-21.243 45.422a17.03 17.03 0 0 1-12.117 5.024h-22.72c-8.285 0-15 6.714-15 15v168.695c0 13.875-11.289 25.164-25.168 25.164h-66.71V376.5c0-30.418-24.747-55.168-55.169-55.168H232.38c-30.422 0-55.172 24.75-55.172 55.168V482h-66.71c-13.876 0-25.169-11.29-25.169-25.164V288.14c0-8.286-6.715-15-15-15H48a13.9 13.9 0 0 0-.703-.032c-4.469-.078-8.66-1.851-11.8-4.996-6.68-6.68-6.68-17.55 0-24.234.003 0 .003-.004.007-.008l.012-.012L244.363 35.02A17.003 17.003 0 0 1 256.477 30c4.574 0 8.875 1.781 12.113 5.02l208.8 208.796.098.094c6.645 6.692 6.633 17.54-.031 24.207zm0 0"></path>
            </svg>
          </Link>
          <Link href="/wishlist">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20px"
              className="cursor-pointer fill-[#333] hover:fill-[#077bff]"
              viewBox="0 0 24 24"
            >
              <path d="M12 4.748l-.717-.737C5.6-1.283 0 1.528 0 7.275 0 10.065 1.664 13.1 5.022 16.07c1.33 1.204 2.794 2.355 4.399 3.6l.01.007c.15.111.31.233.484.366.37.268.75.53 1.137.788.171-.118.336-.23.489-.334l.004-.003c1.605-1.245 3.069-2.396 4.399-3.6C22.336 13.1 24 10.065 24 7.275c0-5.747-5.6-8.558-11.283-4.26L12 4.748zM12 20.05c-.075-.051-.2-.137-.364-.251a53.642 53.642 0 0 1-.969-.686c-1.574-1.215-3.017-2.33-4.316-3.473C2.837 13.31 1.5 10.787 1.5 7.275c0-4.288 4.645-6.708 9.188-2.132L12 6.315l1.312-1.172c4.543-4.576 9.188-2.156 9.188 2.132 0 3.512-1.337 6.035-4.851 8.365-1.299 1.142-2.742 2.258-4.316 3.473a52.586 52.586 0 0 1-1.334.937c-.165.114-.289.2-.364.251z"></path>
            </svg>
          </Link>
          <Link href="/profile">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20px"
              className="cursor-pointer fill-[#333] hover:fill-[#077bff]"
              viewBox="0 0 48 48"
            >
              <path d="M24 0C10.746 0 0 10.746 0 24s10.746 24 24 24 24-10.746 24-24S37.254 0 24 0zm0 9.586c3.563 0 6.457 2.894 6.457 6.457s-2.894 6.457-6.457 6.457-6.457-2.894-6.457-6.457 2.894-6.457 6.457-6.457zm0 31.79c-4.295 0-8.137-1.933-10.697-5.004.054-3.992 8.93-6.177 10.697-6.177 1.771 0 10.643 2.188 10.697 6.177-2.559 3.07-6.402 5.004-10.697 5.004z"></path>
            </svg>
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      <nav
        className={`lg:hidden py-4 ${menuOpen ? "block" : "hidden"}`}
        aria-label="Mobile Navigation"
      >
        <ul className="flex flex-col space-y-6">
          <li>
            <Link href="/cart">Cart</Link>
          </li>
          <li>
            <Link href="/wishlist">Wishlist</Link>
          </li>
          <li>
            <Link href="/profile">My Profile</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
