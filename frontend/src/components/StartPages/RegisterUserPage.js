import { useNavigate } from "react-router-dom";

function RegisterUserPage() {
    const navigate = useNavigate();

    return (
        <div className="auth-container">
            <div className="auth-logo">🌱</div>
            <h1 className="auth-title">Opprett konto</h1>

            <div className="auth-form">
                <input placeholder="Navn" />
                <input placeholder="Brukernavn" />
                <input placeholder="Passord" type="password" />
                <input placeholder="Bekreft passord" type="password" />
                <button onClick={() => navigate("/register-options")}>Registrer deg</button>
                <p className="auth-switch">
                    Har du allerede konto? <span onClick={() => navigate("/")}>Logg inn</span>
                </p>
            </div>
        </div>
    );
}

export default RegisterUserPage;