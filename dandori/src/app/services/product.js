const BASE_URL = 'http://localhost:8000/api/products';

// Buscar productos con paginación
export const searchProducts = async (search, page = 1, limit = 5) => {
  try {
    const response = await fetch(`${BASE_URL}/search?search=${search}&page=${page}&limit=${limit}`);
    const responseJSON = await response.json();
    if (!response.ok) throw new Error(responseJSON.message || 'Failed to search products');
    return responseJSON;
  } catch (error) {
    console.error('Error searching products:', error);
    throw error;
  }
};

// Crear un nuevo producto-supermercado
export const createProductSupermarket = async (data) => {
  try {
    const response = await fetch(`${BASE_URL}/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const responseJSON = await response.json();
    if (!response.ok) throw new Error(responseJSON.message || 'Failed to create product-supermarket');
    return responseJSON;
  } catch (error) {
    console.error('Error creating product-supermarket:', error);
    throw error;
  }
};

// Crear un nuevo producto
export const createProduct = async (data) => {
  try {
    const response = await fetch(`${BASE_URL}/createp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const responseJSON = await response.json();
    if (!response.ok) throw new Error(responseJSON.message || 'Failed to create product');
    return responseJSON;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

// Obtener todos los productos-supermercados
export const getAllProductsSupermarkets = async () => {
  try {
    const response = await fetch(`${BASE_URL}/getAll`);
    const responseJSON = await response.json();
    if (!response.ok) throw new Error(responseJSON.message || 'Failed to fetch all product-supermarkets');
    return responseJSON;
  } catch (error) {
    console.error('Error fetching product-supermarkets:', error);
    throw error;
  }
};

// Obtener detalles de un producto
export const getProductDetails = async (productId, supermarketId) => {
  try {
    const response = await fetch(`${BASE_URL}/getProductDetails?productId=${productId}&supermarketId=${supermarketId}`);
    const responseJSON = await response.json();
    if (!response.ok) throw new Error(responseJSON.message || 'Failed to fetch product details');
    return responseJSON;
  } catch (error) {
    console.error('Error fetching product details:', error);
    throw error;
  }
};

// Obtener detalles de un producto por codigo escaneado
export const getProductDetailsByScannedCode = async (barcode, supermarketId) => {
  try {
    const response = await fetch(`${BASE_URL}/getProductDetailsByBarcodeSupermarket?barcode=${barcode}&supermarketId=${supermarketId}`);
    const responseJSON = await response.json();
    if (!response.ok) throw new Error(responseJSON.message || 'Failed to fetch product details');
    return responseJSON;
  } catch (error) {
    console.error('Error fetching product details:', error);
    throw error;
  }
};

// Obtener productos por supermercado
export const getProductBySupermarket = async (supermarketId) => {
  try {
    const response = await fetch(`${BASE_URL}/getProductBySupermarket?supermarketId=${supermarketId}`);
    const responseJSON = await response.json();
    if (!response.ok) throw new Error(responseJSON.message || 'Failed to fetch products by supermarket');
    return responseJSON;
  } catch (error) {
    console.error('Error fetching products by supermarket:', error);
    throw error;
  }
};