import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getPlants } from "../../services/plantService";

function PlantsPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    const [plants, setPlants] = useState([]);

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        if (userId) {
            getPlants(userId).then(data => setPlants(data));
        }
    }, []);

    return (
        <div className="page-container">
            <div className="plant-list">
                <h2>Mine planter</h2>
                {plants.length === 0 ? (
                    <p style={{ color: "#888", fontSize: "14px" }}>Ingen planter ennå — legg til din første! 🌱</p>
                ) : (
                    plants.map(plant => (
                        <div key={plant.id} className="plant-card" onClick={() => navigate(`/plant/${plant.id}`)}>
                            <div className="plant-card-info">
                                <h3>{plant.name || plant.species?.name}</h3>
                                <p>{plant.species?.name}</p>
                                <p className="plant-watered">
                                    💧 {plant.lastWatered ? `Vannet ${plant.lastWatered}` : "Ikke vannet ennå"}
                                </p>
                            </div>
                            <span className="plant-card-arrow">›</span>
                        </div>
                    ))
                )}
            </div>

            <div className="bottom-bar">
                <button className={isActive("/plants") ? "bottom-bar-item active" : "bottom-bar-item"} onClick={() => navigate("/plants")}>
                    🌱 <span>Planter</span>
                </button>
                <button className={isActive("/watering") ? "bottom-bar-item active" : "bottom-bar-item"} onClick={() => navigate("/watering")}>
                    💧 <span>Vanning</span>
                </button>
                <button className={isActive("/create") ? "bottom-bar-item active" : "bottom-bar-item"} onClick={() => navigate("/create")}>
                    ➕ <span>Opprett</span>
                </button>
                <button className={isActive("/settings") ? "bottom-bar-item active" : "bottom-bar-item"} onClick={() => navigate("/settings")}>
                    ⚙️ <span>Innst.</span>
                </button>
            </div>
        </div>
    );
}

export default PlantsPage;