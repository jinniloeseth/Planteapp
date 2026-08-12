const BASE_URL = `${process.env.REACT_APP_API_URL}/usersettings`;

export const getUserSettings = async (userId) => {
    const response = await fetch(`${BASE_URL}/${userId}`);
    return response.json();
};

export const updateUserSettings = async (userId, settings) => {
    await fetch(`${BASE_URL}/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings)
    });
};