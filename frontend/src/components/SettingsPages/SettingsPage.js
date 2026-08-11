import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function SettingsPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    const [showPlantSettings, setShowPlantSettings] = useState(false);
    const [editingName, setEditingName] = useState(false);
    const [name, setName] = useState("Janni");

    // Dummy UserSettings - hentes fra backend senere
    const [userSettings, setUserSettings] = useState({
        showName: true,
        showLocation: false,
        showPurchaseDate: false,
        showNotes: false,
    });

    const fieldLabels = {
        showName: "Navn",
        showLocation: "Plassering",
        showPurchaseDate: "Kjøpsdato",
        showNotes: "Notater",
    };

    const toggleField = (field) => {
        setUserSettings({ ...userSettings, [field]: !userSettings[field] });
    };

    return (
        <div className="page-container">
            <h2>Innstillinger</h2>

            {/* Profilseksjon */}
            <div className="settings-profile">
                <div className="settings-avatar">🌱</div>
                <div className="settings-profile-info">
                    {editingName ? (
                        <div className="settings-name-edit">
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                autoFocus
                            />
                            <button onClick={() => setEditingName(false)}>Lagre</button>
                        </div>
                    ) : (
                        <div className="settings-name-row">
                            <h3>{name}</h3>
                            <span className="settings-edit-link" onClick={() => setEditingName(true)}>Endre</span>
                        </div>
                    )}
                    <p className="settings-username">@janni</p>
                </div>
            </div>

            {/* Planteinnstillinger */}
            <div className="settings-section">
                <div className="settings-item" onClick={() => setShowPlantSettings(true)}>
                    <span>🌿 Planteinnstillinger</span>
                    <span className="settings-arrow">›</span>
                </div>
            </div>

            {/* Popup */}
            {showPlantSettings && (
                <div className="popup-overlay" onClick={() => setShowPlantSettings(false)}>
                    <div className="popup" onClick={(e) => e.stopPropagation()}>
                        <h3>Planteinnstillinger</h3>
                        <p style={{ fontSize: "13px", color: "#888", margin: "0 0 16px 0" }}>
                            Velg hvilken informasjon som vises på plantene dine.
                        </p>

                        {/* Mandatory felt */}
                        <p className="options-section-label">Alltid aktivert</p>
                        {["Art", "Vanning"].map((label) => (
                            <div key={label} className="option-item option-locked">
                                <span className="option-label">{label}</span>
                                <div className="toggle toggle-on toggle-disabled">
                                    <div className="toggle-knob"></div>
                                </div>
                            </div>
                        ))}

                        {/* Valgfrie felt */}
                        <p className="options-section-label" style={{ marginTop: "16px" }}>Valgfritt</p>
                        {Object.entries(userSettings).map(([field, enabled]) => (
                            <div key={field} className="option-item" onClick={() => toggleField(field)}>
                                <span className="option-label">{fieldLabels[field]}</span>
                                <div className={`toggle ${enabled ? "toggle-on" : ""}`}>
                                    <div className="toggle-knob"></div>
                                </div>
                            </div>
                        ))}

                        <button style={{ marginTop: "16px" }} onClick={() => setShowPlantSettings(false)}>
                            Lagre
                        </button>
                    </div>
                </div>
            )}

            {/* Bunnmeny */}
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

export default SettingsPage;