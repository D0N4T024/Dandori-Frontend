const BASE_URL = 'https://dandori-api-production.up.railway.app/api/user-types';

export const getAllUserTypes = async () => {
    try {
        const response = await fetch(`${BASE_URL}/getAll`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Failed to fetch user types");
        return data;
    } catch (error) {
        console.error("Error fetching user types:", error);
        throw error;
    }
};

export const getUserTypeById = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/getById?id=${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Failed to fetch user type by ID");
        return data;
    } catch (error) {
        console.error("Error fetching user type by ID:", error);
        throw error;
    }
};

export const createUserType = async (data) => {
    try {
        const response = await fetch(`${BASE_URL}/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.message || "Failed to create user type");
        return result;
    } catch (error) {
        console.error("Error creating user type:", error);
        throw error;
    }
};

export const updateUserType = async (id, data) => {
    try {
        const response = await fetch(`${BASE_URL}/update?id=${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.message || "Failed to update user type");
        return result;
    } catch (error) {
        console.error("Error updating user type:", error);
        throw error;
    }
};

export const deleteUserType = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/delete?id=${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.message || "Failed to delete user type");
        return result;
    } catch (error) {
        console.error("Error deleting user type:", error);
        throw error;
    }
};
