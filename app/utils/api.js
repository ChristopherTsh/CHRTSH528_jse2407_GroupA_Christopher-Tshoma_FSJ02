import config from './config.js';

const API_BASE_URL = config.apiBaseUrl;

export async function fetchProducts({ category = '', sort = '', search = '' }) {
  try {
    const url = `${API_BASE_URL}/products?category=${category}&sort=${sort}&search=${search}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch products. Status: ${response.status}`);
    }

    const data = await response.json();
    const products = data.products || [];
    const total = data.total || 0;

    return { products, total };
  } catch (error) {
    console.error('Error fetching products:', error.message);
    return { products: [], total: 0 };
  }
}

