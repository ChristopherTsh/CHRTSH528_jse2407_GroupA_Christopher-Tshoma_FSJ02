import { useState } from "react";
import { useRouter } from "next/router";

function PriceSort() {
  const [sortOrder, setSortOrder] = useState("");
  const router = useRouter();

  const handleSortChange = (e) => {
    const sort = e.target.value;
    setSortOrder(sort);
    router.push(`/?sort=${sort}`);
  };

  return (
    <select
      value={sortOrder}
      onChange={handleSortChange}
      className="border p-2 mb-4"
    >
      <option value="">Sort by Price</option>
      <option value="asc">Price: Low to High</option>
      <option value="desc">Price: High to Low</option>
    </select>
  );
}

export default PriceSort;
