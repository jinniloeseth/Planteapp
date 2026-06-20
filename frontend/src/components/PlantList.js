import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPlants, deletePlant } from "../services/plantService";
import '../App.css';


function PlantList() {
    const [plants, setPlants] = useState([]);
    const navigate = useNavigate();
    const [message, setMessage] = useState("");

    useEffect(() => {
        getPlants().then(data => setPlants(data));
    }, []);

    const handleDelete = async (id) => {
        await deletePlant(id);
        setPlants(plants.filter(plant => plant.id !== id));
        setMessage("Planten ble slettet ✅");
        setTimeout(() => setMessage(""), 3000);
    };

    return (
       <div className="app-container">
            <h2>Mine planter</h2>
            {message && <p className="success-message">{message}</p>}
            {plants.map(plant => (
                <div className="plant-card" key={plant.id}>
                    <button className="delete-button" onClick={() => handleDelete(plant.id)}>
                        🗑️
                    </button>
                    
                    <h3>{plant.name ? plant.name : plant.species.name}</h3>
                    <p>Plassering: {plant.location ? plant.location : "Ingen gitt plassering"}</p>
                    <p>Notater: {plant.notes ? plant.notes : "Ingen notater"}</p>
                    <p>Sist vannet: {plant.lastWatered ? plant.lastWatered : "Ikke registrert"}</p>
                </div>
            ))}
        </div>
    );
}

export default PlantList;