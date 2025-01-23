const BASE_URL = 'https://dandori-api-production.up.railway.app/api/brands';

// Obtener todas las marcas simples
export const getAllSimpleBrands = async () => {
  try {
    const response = await fetch(`${BASE_URL}/getAllSimple`);
    if (!response.ok) throw new Error('Failed to fetch brands');
    return await response.json();
  } catch (error) {
    console.error('Error fetching brands:', error);
    throw error;
  }
};

// Obtener todas las marcas
export const getAllBrands = async () => {
  try {
    const response = await fetch(`${BASE_URL}/getAll`);
    if (!response.ok) throw new Error('Failed to fetch all brands');
    return await response.json();
  } catch (error) {
    console.error('Error fetching all brands:', error);
    throw error;
  }
};

// Obtener detalles de una marca
export const getBrandById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/getById?id=${id}`);
    if (!response.ok) throw new Error('Failed to fetch brand details');
    return await response.json();
  } catch (error) {
    console.error('Error fetching brand details:', error);
    throw error;
  }
};

// Crear una nueva marca
export const createBrand = async (data) => {
  try {
    const response = await fetch(`${BASE_URL}/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create brand');
    return await response.json();
  } catch (error) {
    console.error('Error creating brand:', error);
    throw error;
  }
};

// Actualizar una marca
export const updateBrand = async (id, data) => {
  try {
    const response = await fetch(`${BASE_URL}/update?id=${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update brand');
    return await response.json();
  } catch (error) {
    console.error('Error updating brand:', error);
    throw error;
  }
};

// Eliminar una marca
export const deleteBrand = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/delete?id=${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete brand');
    return await response.json();
  } catch (error) {
    console.error('Error deleting brand:', error);
    throw error;
  }
};
