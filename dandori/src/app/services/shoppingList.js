const BASE_URL = "https://dandori-api-production.up.railway.app/api/shopping-lists";


export const getShoppingList = async (userId, supermarketId) => {
    try {
        const queryParams = new URLSearchParams({ userId, supermarketId });
        const response = await fetch(`${BASE_URL}/getShoppingList?${queryParams}`, {
            method: "GET",
            credentials: "include", // Send cookies with the request
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Error fetching shopping list");
        return data;
    } catch (error) {
        console.error("Error fetching shopping list:", error.message);
        throw error;
    }
};

export const addProductToShoppingList = async (userId, productId, supermarketId, quantity = 1) => {
    try {
        const response = await fetch(`${BASE_URL}/addProduct`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId, productId, supermarketId, quantity }),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Error adding product to shopping list");
        return data;
    } catch (error) {
        console.error("Error adding product to shopping list:", error.message);
        throw error;
    }
};

export const dropProductFromShoppingList = async (userId, productId, supermarketId) => {
    try {
        const response = await fetch(`${BASE_URL}/dropProduct`, {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId, productId, supermarketId }),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Error removing product from shopping list");
        return data;
    } catch (error) {
        console.error("Error removing product from shopping list:", error.message);
        throw error;
    }
};