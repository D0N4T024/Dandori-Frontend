const BASE_URL = 'http://localhost:8000/api/categories';

// Crear una categoría
export const createCategory = async (data) => {
  try {
    const response = await fetch(`${BASE_URL}/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create category');
    return await response.json();
  } catch (error) {
    console.error('Error creating category:', error);
    throw error;
  }
};

// Obtener todas las categorías (simplificadas)
export const getAllSimpleCategories = async () => {
  try {
    const response = await fetch(`${BASE_URL}/getAllSimple`);
    if (!response.ok) throw new Error('Failed to fetch categories');
    return await response.json();
  } catch (error) {
    console.error('Error fetching simple categories:', error);
    throw error;
  }
};

// Obtener todas las categorías
export const getAllCategories = async () => {
  try {
    const response = await fetch(`${BASE_URL}/getAll`);
    if (!response.ok) throw new Error('Failed to fetch categories');
    return await response.json();
  } catch (error) {
    console.error('Error fetching all categories:', error);
    throw error;
  }
};

// Obtener una categoría por ID
export const getCategoryById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/getById?id=${id}`);
    if (!response.ok) throw new Error('Failed to fetch category');
    return await response.json();
  } catch (error) {
    console.error('Error fetching category by ID:', error);
    throw error;
  }
};

// Actualizar una categoría
export const updateCategory = async (id, data) => {
  try {
    const response = await fetch(`${BASE_URL}/update?id=${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update category');
    return await response.json();
  } catch (error) {
    console.error('Error updating category:', error);
    throw error;
  }
};

// Eliminar una categoría
export const deleteCategory = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/delete?id=${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete category');
    return await response.json();
  } catch (error) {
    console.error('Error deleting category:', error);
    throw error;
  }
};
