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
    
    // Adjust the way you access the products and total depending on the actual response structure
    let products;
    let total;

    // Check if the response is an array or an object
    if (Array.isArray(data)) {
      products = data; // If data is an array, directly assign it
      total = data.length; // Total will be the length of the array
    } else if (data.products && Array.isArray(data.products)) {
      products = data.products; // If data has a products array, use that
      total = data.total || products.length; // Total is either provided or the length of products
    } else {
      throw new Error('Invalid API response structure');
    }

    return { products, total };
  } catch (error) {
    console.error('Error fetching products:', error.message);
    return { products: [], total: 0 };
  }
}

