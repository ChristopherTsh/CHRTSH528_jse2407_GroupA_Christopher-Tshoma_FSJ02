// app/layout.js
import './globals.css'; // Import any global styles
import Footer from './components/Footer';
import ProductsClient from './components/ProductsClient'; // Import your client component

async function fetchProducts() {
  const res = await fetch(`https://next-ecommerce-api.vercel.app/products?limit=200`, {
    cache: 'force-cache',
  });
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}

export default async function RootLayout({ children }) {
  const products = await fetchProducts();

  return (
    <html lang="en"> {/* Add the <html> tag with the language attribute */}
      <body>
        <div className="max-w-7xl mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Product List</h1>
          {/* Pass products to the client component */}
          <ProductsClient products={products} />
        </div>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
