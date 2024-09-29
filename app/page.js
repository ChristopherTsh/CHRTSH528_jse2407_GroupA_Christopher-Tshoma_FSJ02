import ProductsClient from './components/ProductsClient';

export default function HomePage({ searchParams }) {
  console.log('Rendering HomePage with search params:', searchParams); // Debug log
  return (
    <div>
      <ProductsClient searchParams={searchParams} />
    </div>
  );
}
