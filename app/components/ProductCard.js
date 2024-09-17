import Link from "next/link";

/**
 * ProductCard component displays a product with its image, title, price, and action buttons.
 *
 * @param {Object} props - The component props
 * @param {Object} props.product - The product data
 * @param {string} props.product.id - The unique identifier for the product
 * @param {string} props.product.title - The title of the product
 * @param {string} props.product.thumbnail - The URL of the product's thumbnail image
 * @param {number} props.product.price - The price of the product
 * @returns {JSX.Element} The ProductCard component
 */
export default function ProductCard({ product }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full h-48 object-cover mb-4"
      />
      <h2 className="text-lg font-bold mb-2">{product.title}</h2>
      <p className="text-gray-700 mb-2">${product.price}</p>
      <div className="flex space-x-2">
        {/* View Product */}
        <Link href={`/products/${product.id}`}>
          <span className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            View Product
          </span>
        </Link>

        {/* Add to Cart */}
        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Add to Cart
        </button>

        {/* Add to Wishlist */}
        <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
          Add to Wishlist
        </button>
      </div>
    </div>
  );
}
