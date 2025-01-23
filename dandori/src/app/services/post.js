const BASE_URL = 'https://dandori-api-production.up.railway.app/api/posts';

// Obtener todos los posts con paginación
export const getPosts = async (page = 1) => {
  try {
    const response = await fetch(`${BASE_URL}/all-posts?page=${page}`);
    if (!response.ok) throw new Error('Failed to fetch posts');
    return await response.json();
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

// Obtener un post por ID
export const getSinglePost = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/single-post?_id=${id}`);
    if (!response.ok) throw new Error('Failed to fetch the post');
    return await response.json();
  } catch (error) {
    console.error('Error fetching post:', error);
    throw error;
  }
};

// Crear un nuevo post
export const createPost = async (data, token) => {
  try {
    const response = await fetch(`${BASE_URL}/create-post`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create post');
    return await response.json();
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

// Actualizar un post
export const updatePost = async (id, data, token) => {
  try {
    const response = await fetch(`${BASE_URL}/update-post?_id=${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update post');
    return await response.json();
  } catch (error) {
    console.error('Error updating post:', error);
    throw error;
  }
};

// Eliminar un post
export const deletePost = async (id, token) => {
  try {
    const response = await fetch(`${BASE_URL}/delete-post?_id=${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error('Failed to delete post');
    return await response.json();
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
};
