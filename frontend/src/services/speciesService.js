const BASE_URL = `${process.env.REACT_APP_API_URL}/species`;

export const getSpecies = async () => {
    const response = await fetch(BASE_URL);
    return response.json();
};

export const getOneSpecies = async (id) => {
    const response = await fetch(`${BASE_URL}/${id}`);
    return response.json();
};