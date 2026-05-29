const BASE_URL = "http://localhost:5053/api/plants";

export const getPlants = async () => {
    const response = await fetch(BASE_URL);
    return response.json();
};

export const getPlant = async (id) => {
    const response = await fetch(`${BASE_URL}/${id}`);
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