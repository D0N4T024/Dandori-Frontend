const BASE_URL = 'https://dandori-api-production.up.railway.app/api/supermarkets';

export const getAllSimpleSupermarkets = async () => {
  try {
    const response = await fetch(`${BASE_URL}/getAllSimple`);
    const data = response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to fetch supermarkets');
    return data;
  } catch (error) {
    console.error('Error fetching simple supermarkets:', error);
    throw error;
  }
};

export const getAllSupermarkets = async () => {
  try {
    const response = await fetch(`${BASE_URL}/getAll`);
    if (!response.ok) throw new Error(JSON.stringify(response.message));
    return await response.json();
  } catch (error) {
    console.error('Error fetching all supermarkets:', error);
    throw error;
  }
};

export const getSupermarketById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/getById?id=${id}`);
    if (!response.ok) throw new Error(JSON.stringify(response.message));
    return await response.json();
  } catch (error) {
    console.error('Error fetching supermarket by ID:', error);
    throw error;
  }
};

export const createSupermarket = async (supermarket) => {
  try {
    const response = await fetch(`${BASE_URL}/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(supermarket),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Failed to create supermarket");
    return data;
  } catch (error) {
    console.error('Error creating supermarket:', error);
    throw error;
  }
};

export const updateSupermarket = async (id, data) => {
  try {
    const response = await fetch(`${BASE_URL}/update?id=${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const data = response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to update supermarket');
    return data;
  } catch (error) {
    console.error('Error updating supermarket:', error);
    throw error;
  }
};

export const deleteSupermarket = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/delete?id=${id}`, { method: 'DELETE' });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to delete supermarket');
    return data;
  } catch (error) {
    console.error('Error deleting supermarket:', error);
    throw error;
  }
};