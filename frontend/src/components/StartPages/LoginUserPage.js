import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/userService";

function LoginUserPage() {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        username: "",
        passwordHash: "",
    });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleLogin = async () => {
        const user = await loginUser(credentials);
        if (user.id) {
            localStorage.setItem("userId", user.id);
            navigate("/plants");
        } else {
            setError("Feil brukernavn eller passord.");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-logo">🌱</div>
            <h1 className="auth-title">Planteapp</h1>

            <div className="auth-form">
                <input
                    name="username"
                    placeholder="Brukernavn"
                    onChange={handleChange}
                />
                <input
                    name="passwordHash"
                    placeholder="Passord"
                    type="password"
                    onChange={handleChange}
                />
                {error && <p style={{ color: "red", fontSize: "13px" }}>{error}</p>}
                <button onClick={handleLogin}>Logg inn</button>
                <p className="auth-switch">
                    Har du ikke konto? <span onClick={() => navigate("/register")}>Registrer deg</span>
                </p>
            </div>
        </div>
    );
}

export default LoginUserPage;