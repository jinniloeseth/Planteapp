const BASE_URL = process.env.REACT_APP_API_URL;

export const registerUser = async (user) => {
    const response = await fetch(`${BASE_URL}/user/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
    });
    return response.json();
};

export const loginUser = async (user) => {
    const response = await fetch(`${BASE_URL}/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
    });
    return response.json();
};

export const getUser = async (userId) => {
    const response = await fetch(`${BASE_URL}/user/${userId}`);
    return response.json();
};