import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function CreatePlantPage() {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    // Dummy UserSettings - byttes ut med API-kall senere
    const userSettings = {
        showName: true,
        showSpecies: true,    // mandatory
        showWatering: true,   // mandatory
        showLocation: false,
        showPurchaseDate: false,
        showNotes: false,
    };

    const [plant, setPlant] = useState({
        name: "",
        species: "",
        wateringIntervalDays: 7,
        location: "",
        purchaseDate: "",
        notes: "",
    });

    const handleChange = (e) => {
        setPlant({ ...plant, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        // Lagre til backend senere
        console.log("Plante opprettet:", plant);
        navigate("/plants");
    };

    return (
        <div className="page-container">
            <h2>Opprett plante</h2>

            <div className="create-form">

                {/* MANDATORY - Art */}
                <div className="form-group">
                    <label>Art *</label>
                    <input
                        name="species"
                        placeholder="F.eks. Monstera Deliciosa"
                        value={plant.species}
                        onChange={handleChange}
                    />
                </div>

                {/* MANDATORY - Vanningsintervall */}
                <div className="form-group">
                    <label>Vanningsintervall (dager) *</label>
                    <input
                        name="wateringIntervalDays"
                        type="number"
                        value={plant.wateringIntervalDays}
                        onChange={handleChange}
                    />
                </div>

                {/* VALGFRITT - vises kun hvis aktivert i UserSettings */}
                {userSettings.showName && (
                    <div className="form-group">
                        <label>Navn</label>
                        <input
                            name="name"
                            placeholder="F.eks. Lille Monstera"
                            value={plant.name}
                            onChange={handleChange}
                        />
                    </div>
                )}

                {userSettings.showLocation && (
                    <div className="form-group">
                        <label>Plassering</label>
                        <input
                            name="location"
                            placeholder="F.eks. Stua"
                            value={plant.location}
                            onChange={handleChange}
                        />
                    </div>
                )}

                {userSettings.showPurchaseDate && (
                    <div className="form-group">
                        <label>Kjøpsdato</label>
                        <input
                            name="purchaseDate"
                            type="date"
                            value={plant.purchaseDate}
                            onChange={handleChange}
                        />
                    </div>
                )}

                {userSettings.showNotes && (
                    <div className="form-group">
                        <label>Notater</label>
                        <textarea
                            name="notes"
                            placeholder="F.eks. Liker ikke direkte sol..."
                            value={plant.notes}
                            onChange={handleChange}
                            rows={3}
                        />
                    </div>
                )}

                <button onClick={handleSubmit}>
                    Opprett plante
                </button>

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

export default CreatePlantPage;