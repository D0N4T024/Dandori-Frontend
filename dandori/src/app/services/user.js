const BASE_URL = 'https://dandori-api-production.up.railway.app/api/users';

export const getAllUsers = async () => {
    try {
        const response = await fetch(`${BASE_URL}/getAll`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Failed to fetch users");
        return data;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};

export const getUserById = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/getById?id=${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Failed to fetch user by ID");
        return data;
    } catch (error) {
        console.error("Error fetching user by ID:", error);
        throw error;
    }
};

export const createUser = async (userData) => {
    try {
        const response = await fetch(`${BASE_URL}/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.message || "Failed to create user");
        return result;
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
};

export const updateUser = async (id, userData) => {
    try {
        const response = await fetch(`${BASE_URL}/update?id=${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.message || "Failed to update user");
        return result;
    } catch (error) {
        console.error("Error updating user:", error);
        throw error;
    }
};

export const deleteUser = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/delete?id=${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.message || "Failed to delete user");
        return result;
    } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
    }
};
