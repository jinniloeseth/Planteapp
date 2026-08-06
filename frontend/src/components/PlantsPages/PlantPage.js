import { useNavigate } from "react-router-dom";

function PlantPage() {
    const navigate = useNavigate();

    // Dummy-data for nå
    const plant = {
        id: 1,
        name: "Monstera",
        species: "Monstera Deliciosa",
        lastWatered: "2026-08-01",
        location: "Stua",
        purchaseDate: "2026-01-15",
        notes: "Liker ikke direkte sol",
    };

    // Dummy UserSettings
    const userSettings = {
        showName: true,
        showSpecies: true,
        showWatering: true,
        showLocation: true,
        showPurchaseDate: false,
        showNotes: true,
    };

    return (
        <div className="page-container">

            <div className="plant-detail-header">
                <button className="back-button" onClick={() => navigate("/plants")}>← Tilbake</button>
                <div className="plant-detail-actions">
                    <button className="icon-button">✏️</button>
                    <button className="icon-button">🗑️</button>
                </div>
            </div>

            <div className="plant-detail-hero">
                <div className="plant-detail-emoji">🌿</div>
                <h1>{userSettings.showName && plant.name ? plant.name : plant.species}</h1>
                {userSettings.showName && plant.name && (
                    <p className="plant-detail-species">{plant.species}</p>
                )}
            </div>

            <div className="plant-detail-cards">

                {userSettings.showWatering && (
                    <div className="detail-card">
                        <span className="detail-card-label">💧 Sist vannet</span>
                        <span className="detail-card-value">{plant.lastWatered || "Ikke registrert"}</span>
                    </div>
                )}

                {userSettings.showLocation && (
                    <div className="detail-card">
                        <span className="detail-card-label">📍 Plassering</span>
                        <span className="detail-card-value">{plant.location || "Ikke registrert"}</span>
                    </div>
                )}

                {userSettings.showPurchaseDate && (
                    <div className="detail-card">
                        <span className="detail-card-label">🛒 Kjøpsdato</span>
                        <span className="detail-card-value">{plant.purchaseDate || "Ikke registrert"}</span>
                    </div>
                )}

                {userSettings.showNotes && (
                    <div className="detail-card">
                        <span className="detail-card-label">📝 Notater</span>
                        <span className="detail-card-value">{plant.notes || "Ingen notater"}</span>
                    </div>
                )}

            </div>

            <button className="water-button" onClick={() => {}}>
                💧 Vann planten nå
            </button>

        </div>
    );
}

export default PlantPage;