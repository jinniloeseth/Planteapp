import { useNavigate } from "react-router-dom";

function LoginUserPage() {
    const navigate = useNavigate();

    return (
        <div className="auth-container">
            <div className="auth-logo">🌱</div>
            <h1 className="auth-title">Planteapp</h1>

            <div className="auth-form">
                <input placeholder="Brukernavn" />
                <input placeholder="Passord" type="password" />
                <button onClick={() => navigate("/plants")}>Logg inn</button>
                <p className="auth-switch">
                    Har du ikke konto? <span onClick={() => navigate("/register")}>Registrer deg</span>
                </p>
            </div>
        </div>
    );
}

export default LoginUserPage;