const BASE_URL = `${process.env.REACT_APP_API_URL}/plants`;

export const getPlants = async (userId) => {
    const response = await fetch(`${BASE_URL}/${userId}`);
    return response.json();
};

export const getPlant = async (userId, id) => {
    const response = await fetch(`${BASE_URL}/${userId}/${id}`);
    return response.json();
};

export const createPlant = async (plant) => {
    const response = await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(plant)
    });
    return response.json();
};

export const updatePlant = async (id, plant) => {
    await fetch(`${BASE_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(plant)
    });
};

export const deletePlant = async (id) => {
    await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE"
    });
};

export const waterPlant = async (id) => {
    await fetch(`${BASE_URL}/${id}/water`, {
        method: "PUT"
    });
};