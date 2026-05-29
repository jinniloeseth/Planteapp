import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPlants } from "../services/plantService";

function PlantList() {
    const [plants, setPlants] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getPlants().then(data => setPlants(data));
    }, []);

    return (
        <div>
            <h2>Mine planter</h2>
            <button onClick={() => navigate("/add")}>Legg til plante</button>
            {plants.map(plant => (
                <div key={plant.id}>
                    <h3>{plant.name}</h3>
                    <p>Plassering: {plant.location}</p>
                    <p>Sist vannet: {plant.lastWatered}</p>
                    
                </div>
            ))}
        </div>
    );
}

export default PlantList;