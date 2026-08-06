import { useNavigate, useLocation } from "react-router-dom";

function PlantsPage() {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    // Dummy-data for å se hvordan det ser ut
    const plants = [
        { id: 1, name: "Monstera", species: "Monstera Deliciosa", lastWatered: "2026-08-01" },
        { id: 2, name: "Thai Con", species: "Thai Constellation", lastWatered: "2026-08-03" },
        { id: 3, species: "Aloe Vera", lastWatered: null },
    ];

    return (
        <div className="page-container">

            <div className="plant-list">
                <h2>Mine planter</h2>
                {plants.map(plant => (
                    <div key={plant.id} className="plant-card" onClick={() => navigate(`/plant/${plant.id}`)}>
                        <div className="plant-card-info">
                            <h3>{plant.name || plant.species}</h3>
                            <p>{plant.species}</p>
                            <p className="plant-watered">
                                💧 {plant.lastWatered ? `Vannet ${plant.lastWatered}` : "Ikke vannet ennå"}
                            </p>
                        </div>
                        <span className="plant-card-arrow">›</span>
                    </div>
                ))}
            </div>

            <div className="bottom-bar">
                <button className={isActive("/home") ? "bottom-bar-item active" : "bottom-bar-item"} onClick={() => navigate("/plants")}>
                    🌱 <span>Planter</span>
                </button>
                <button className={isActive("/watering") ? "bottom-bar-item active" : "bottom-bar-item"} onClick={() => navigate("/watering")}>
                    💧 <span>Vanning</span>
                </button>
                <button className={isActive("/createPlant") ? "bottom-bar-item active" : "bottom-bar-item"} onClick={() => navigate("/create")}>
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