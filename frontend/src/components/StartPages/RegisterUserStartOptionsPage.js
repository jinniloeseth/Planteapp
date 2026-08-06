import { useState } from "react";
import { useNavigate } from "react-router-dom";

function RegisterStartUserOptionsPage() {
    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(false);
    const [request, setRequest] = useState("");
    const [requestSent, setRequestSent] = useState(false);

    const [fields, setFields] = useState({
        showLocation: false,
        showPurchaseDate: false,
        showNotes: false,
    });

    const fieldLabels = {
        showName: "Navn",
        showSpecies: "Art",
        showWatering: "Vanning",
        showLocation: "Plassering",
        showPurchaseDate: "Kjøpsdato",
        showNotes: "Notater",
    };

    const toggleField = (field) => {
        setFields({ ...fields, [field]: !fields[field] });
    };

    const handleSendRequest = () => {
        setRequestSent(true);
        setTimeout(() => {
            setRequestSent(false);
            setShowPopup(false);
            setRequest("");
        }, 2000);
    };

    return (
        <div className="auth-container">
            <h1 className="auth-title">Tilpass appen din</h1>
            <p className="auth-subtitle">Velg hvilken informasjon du ønsker å registrere om plantene dine. Dette kan endres senere.</p>

            <div className="options-list">
            <p className="options-section-label">Alltid aktivert</p>
            
            {["Navn","Art","Vanning"].map((label) => (
                <div key={label} className="option-item option-locked">
                    <span className="option-label">{label}</span>
                    <div className="toggle toggle-on toggle-disabled">
                        <div className="toggle-knob"></div>
                    </div>
                </div>
            ))}

            <p className="options-section-label">Valgfritt</p>

            {Object.entries(fields).map(([field, enabled]) => (
                <div key={field} className="option-item" onClick={() => toggleField(field)}>
                    <span className="option-label">{fieldLabels[field]}</span>
                    <div className={`toggle ${enabled ? "toggle-on" : ""}`}>
                        <div className="toggle-knob"></div>
                    </div>
                </div>
            ))}
        </div>

            <button className="cta-button" onClick={() => navigate("/plants")}>
                Kom i gang →
            </button>

            <p className="request-link" onClick={() => setShowPopup(true)}>
                Savner du noe felt? 
            </p>

            {showPopup && (
                <div className="popup-overlay" onClick={() => setShowPopup(false)}>
                    <div className="popup" onClick={(e) => e.stopPropagation()}>
                        <h3>Hva ønsker du?</h3>
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

export default RegisterStartUserOptionsPage;