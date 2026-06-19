const BASE_URL = `${process.env.REACT_APP_API_URL}/plants`;
const SPECIES_URL = `${process.env.REACT_APP_API_URL}/species`;

//SPECIES 
export const getSpecies = async () => {
    const response = await fetch(SPECIES_URL);
    return response.json();
};

//PLANTS
export const getPlants = async () => {
    const response = await fetch(BASE_URL);
    return response.json();
};

export const getPlant = async (id) => {
    const response = await fetch(`${BASE_URL}/${id}`);
    return response.json();
};

export const createPlant = async (plant) => {
    console.log("Sender plant:", JSON.stringify(plant));
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