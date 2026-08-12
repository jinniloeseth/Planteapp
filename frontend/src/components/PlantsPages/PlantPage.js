import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPlant } from "../../services/plantService";
import { getUserSettings } from "../../services/userSettingsService";
import { waterPlant } from "../../services/plantService";

function PlantPage() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [plant, setPlant] = useState(null);
    const [userSettings, setUserSettings] = useState(null);

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        if (userId) {
            getPlant(userId, id).then(data => {
            console.log("Plant:", data);
            setPlant(data);
            });
            getUserSettings(userId).then(data => {
                console.log("UserSettings:", data);
                setUserSettings(data);
            });
        }
    }, [id]);

    if (!plant || !userSettings) return <p>Laster...</p>;

    const handleWater = async () => {
        await waterPlant(plant.id);
        setPlant({ ...plant, lastWatered: new Date().toISOString() });
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
                <h1>{userSettings.showName && plant.name ? plant.name : plant.species?.name}</h1>
                {userSettings.showName && plant.name && (
                    <p className="plant-detail-species">{plant.species?.name}</p>
                )}
            </div>

            <div className="plant-detail-cards">

               {/* Alltid vis vanning */}
                <div className="detail-card">
                    <span className="detail-card-label">💧 Sist vannet</span>
                    <span className="detail-card-value">{plant.lastWatered || "Ikke registrert"}</span>
                </div>

                {/* Alltid vis art */}
                <div className="detail-card">
                    <span className="detail-card-label">🌿 Art</span>
                    <span className="detail-card-value">{plant.species?.name || "Ikke registrert"}</span>
                </div>

                {/* Valgfrie felt */}
                {userSettings.showName && (
                    <div className="detail-card">
                        <span className="detail-card-label">🪴 Navn</span>
                        <span className="detail-card-value">{plant.name || "Ikke registrert"}</span>
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

            <button className="water-button" onClick={handleWater}>
                💧 Vann planten nå
            </button>

        </div>
    );
}

export default PlantPage;