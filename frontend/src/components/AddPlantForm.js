import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPlant, getSpecies } from "../services/plantService";

function AddPlantForm() {
    const navigate = useNavigate();
    const [speciesList, setSpeciesList] = useState([]);
    const [message, setMessage] = useState("");

    const [plant, setPlant] = useState({
        name: "",
        speciesId: "",
        location: "",
        notes: "",
        wateringIntervalDays: ""
    });

    useEffect(() => {
        getSpecies().then(data => setSpeciesList(data));
    }, []);

    const handleChange = (e) => {
        setPlant({ ...plant, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createPlant(plant);
        setMessage("Planten ble lagret ✅");
        setTimeout(() => {
            console.log("4. Naviger nå");
            setMessage("");
            navigate("/");
        }, 1500);
    };

    const handleSpeciesChange = (e) => {
        const selectedId = e.target.value;
        const selected = speciesList.find(s => s.id === parseInt(selectedId));
        
        setPlant({
            ...plant,
            speciesId: selectedId,
            wateringIntervalDays: selected ? selected.wateringIntervalDays : plant.wateringIntervalDays
        });
    };

    return (
        <div className="app-container">
            <h2>Legg til plante</h2>
            {message && <p className="success-message">{message}</p>}
            <form onSubmit={handleSubmit}>

                <select name="speciesId" onChange={handleSpeciesChange} defaultValue="" required>
                    <option value="" disabled>Velg art</option>
                    {speciesList.map(species => (
                        <option key={species.id} value={species.id}>
                            {species.name}
                        </option>
                    ))}
                </select> <br />

                <input 
                    name="wateringIntervalDays" 
                    placeholder="Vanningsintervall (dager)"
                    type="number" 
                    value={plant.wateringIntervalDays}
                    onChange={handleChange} 
                    required 
                /> <br />

                <h3>Valgfritt</h3>

                <input name="name" placeholder="Navn" onChange={handleChange} /> <br />
                <input name="location" placeholder="Plassering" onChange={handleChange} /> <br />
                <input name="notes" placeholder="Notater" onChange={handleChange} /> <br />
    

                <button type="submit">Lagre plante</button>
                
            </form>

            <button className="back-button" onClick={() => navigate("/")}>
                ← 
            </button>
        </div>
    );
}

export default AddPlantForm;