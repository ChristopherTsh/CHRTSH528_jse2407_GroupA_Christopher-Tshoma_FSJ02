// app/products/[id]/page.js

import Link from "next/link";
import ProductDetail from "./ProductImageGallery"; // Import ProductDetail component

/**
 * ProductPage component that displays a product's detail page based on its ID.
 * 
 * @component
 * @param {Object} props - Component properties.
 * @param {Object} props.params - Parameters from the Next.js routing system.
 * @param {string} props.params.id - The ID of the product to fetch.
 * @returns {JSX.Element} ProductPage component.
 */
export default async function ProductPage({ params }) {
  let product = null;
  let error = null;

  try {
    const res = await fetch(`https://next-ecommerce-api.vercel.app/products/${params.id}`);

    if (!res.ok) {
      throw new Error('Failed to fetch product');
    }

    product = await res.json();
  } catch (err) {
    error = err.message;
  }

  if (error) {
    return <div className="text-red-500 text-center">Error: {error}</div>;
  }

  if (!product) {
    return <div className="text-center text-gray-700">No product found.</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <Link href="/" className="min-w-[250px] px-4 py-2.5 border border-yellow-300 bg-transparent text-yellow-300 text-sm font-semibold rounded">
        Back to Products
      </Link>
      <ProductDetail product={product} />
    </div>
  );
}
