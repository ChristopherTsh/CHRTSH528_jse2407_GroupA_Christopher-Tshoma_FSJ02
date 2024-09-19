import { useRouter } from "next/router";
import { useState } from "react";

function CategoryFilter({ categories }) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const router = useRouter();

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    router.push(`/?category=${category}`);
  };

  return (
    <select
      value={selectedCategory}
      onChange={handleCategoryChange}
      className="border p-2 mb-4"
    >
      <option value="">All Categories</option>
      {categories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  );
}

export default CategoryFilter;
