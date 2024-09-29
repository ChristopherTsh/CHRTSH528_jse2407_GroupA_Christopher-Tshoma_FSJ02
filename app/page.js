// app/page.js
import ProductsClient from './components/ProductsClient';


// Server Component
export default function HomePage({ searchParams }) {
  // Pass searchParams to the client component
  return (
    <div>
      <ProductsClient searchParams={searchParams} />
    </div>
  );
}
