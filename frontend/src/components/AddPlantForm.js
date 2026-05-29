import { getPlants } from "../services/plantService";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPlant } from "../services/plantService";

const plants = await getPlants();

function AddPlantForm() {
    const navigate = useNavigate();
    const [plant, setPlant] = useState({
        name: "",
        species: "",
        location: "",
        notes: "",
        wateringIntervalDays: 7
    });

    const handleChange = (e) => {
        setPlant({ ...plant, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createPlant(plant);
        navigate("/");
    };

    return (
        <div>
            <h2>Legg til plante</h2>
            <form onSubmit={handleSubmit}>
                <input name="name" placeholder="Navn" onChange={handleChange} />
                <input name="species" placeholder="Art" onChange={handleChange} />
                <input name="location" placeholder="Plassering" onChange={handleChange} />
                <input name="notes" placeholder="Notater" onChange={handleChange} />
                <input name="wateringIntervalDays" type="number" placeholder="Vanning (dager)" onChange={handleChange} />
                <button type="submit">Lagre plante</button>
            </form>
        </div>
    );
    
}


export default AddPlantForm;