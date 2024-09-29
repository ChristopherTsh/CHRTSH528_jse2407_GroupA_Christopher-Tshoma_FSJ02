import ProductsClient from '@/components/ProductsClient';
import { useRouter } from 'next/router';

export default function ProductsPage() {
  const router = useRouter();

  return <ProductsClient router={router} />;
}
