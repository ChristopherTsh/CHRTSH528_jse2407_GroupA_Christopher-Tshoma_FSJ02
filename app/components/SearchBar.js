import { useState } from "react";
import { useRouter } from "next/router";

function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/?search=${searchQuery}`);
    } else {
      router.push("/");
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center mb-4">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search products..."
        className="border p-2 rounded-l w-full"
      />
      <button type="submit" className="bg-yellow-500 p-2 rounded-r text-white">
        Search
      </button>
    </form>
  );
}

export default SearchBar;
