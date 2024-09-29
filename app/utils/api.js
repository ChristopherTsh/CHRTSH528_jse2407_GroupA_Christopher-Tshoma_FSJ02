import config from './config.js';

const API_BASE_URL = config.apiBaseUrl;

export async function fetchProducts({ category = '', sort = '', search = '', page = 1, limit = 20 }) {
  try {
    const url = `${API_BASE_URL}/products?category=${category}&sort=${sort}&search=${search}&page=${page}&limit=${limit}`;
    console.log(`Fetching products with URL: ${url}`);
    
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch products. Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Full API Response:', data);
    
    if (!data.products || !Array.isArray(data.products)) {
      throw new Error('Invalid API response structure');
    }

    const products = data.products || [];
    const total = data.total || products.length; // Assuming total is provided, else fallback to products.length

    return { products, total };
  } catch (error) {
    console.error('Error fetching products:', error.message);
    return { products: [], total: 0 };
  }
}
