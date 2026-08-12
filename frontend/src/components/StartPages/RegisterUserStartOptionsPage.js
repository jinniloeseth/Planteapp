import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateUserSettings } from "../../services/userSettingsService";

function RegisterUserStartOptionsPage() {
    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(false);
    const [request, setRequest] = useState("");
    const [requestSent, setRequestSent] = useState(false);

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

    const handleSendRequest = () => {
        setRequestSent(true);
        setTimeout(() => {
            setRequestSent(false);
            setShowPopup(false);
            setRequest("");
        }, 2000);
    };

    const handleKomIGang = async () => {
        // Hent userId fra localStorage - lagres når bruker registrerer seg
        const userId = localStorage.getItem("userId");
        if (userId) {
            await updateUserSettings(userId, {
                userId: parseInt(userId),
                ...userSettings
            });
        }
        navigate("/plants");
    };

    return (
        <div className="auth-container">
            <h1 className="auth-title">Tilpass appen din</h1>
            <p className="auth-subtitle">Velg hvilken informasjon du ønsker å registrere om plantene dine. Dette kan endres senere.</p>

            <div className="options-list">
                <p className="options-section-label">Alltid aktivert</p>
                {["Art", "Vanning", "Navn"].map((label) => (
                    <div key={label} className="option-item option-locked">
                        <span className="option-label">{label}</span>
                        <div className="toggle toggle-on toggle-disabled">
                            <div className="toggle-knob"></div>
                        </div>
                    </div>
                ))}

                <p className="options-section-label">Valgfritt</p>
                {Object.entries(userSettings).map(([field, enabled]) => (
                    <div key={field} className="option-item" onClick={() => toggleField(field)}>
                        <span className="option-label">{fieldLabels[field]}</span>
                        <div className={`toggle ${enabled ? "toggle-on" : ""}`}>
                            <div className="toggle-knob"></div>
                        </div>
                    </div>
                ))}
            </div>

            <button className="cta-button" onClick={handleKomIGang}>
                Kom i gang →
            </button>

            <p className="request-link" onClick={() => setShowPopup(true)}>
                Savner du noe felt?
            </p>

            {showPopup && (
                <div className="popup-overlay" onClick={() => setShowPopup(false)}>
                    <div className="popup" onClick={(e) => e.stopPropagation()}>
                        <div className="popup-header">
                            <h3>Hva ønsker du?</h3>
                            <span className="popup-close" onClick={() => setShowPopup(false)}>✕</span>
                        </div>
                        <p>Beskriv et felt du savner, så vurderer vi å legge det til!</p>
                        <textarea
                            placeholder="F.eks. 'Jeg ønsker å kunne registrere luftfuktighet...'"
                            value={request}
                            onChange={(e) => setRequest(e.target.value)}
                            rows={4}
                        />
                        {requestSent ? (
                            <p className="success-message">Forespørsel sendt! Takk 🌱</p>
                        ) : (
                            <button onClick={handleSendRequest}>Send forespørsel</button>
                        )}
                        <p className="request-link" onClick={() => setShowPopup(false)}>Avbryt</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default RegisterUserStartOptionsPage;