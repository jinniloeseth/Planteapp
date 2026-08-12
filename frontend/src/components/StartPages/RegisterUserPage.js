import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/userService";

function RegisterUserPage() {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: "",
        username: "",
        passwordHash: "",
    });
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleRegister = async () => {
        if (user.passwordHash !== confirmPassword) {
            setError("Passordene matcher ikke.");
            return;
        }

        const newUser = await registerUser(user);
        if (newUser.id) {
            localStorage.setItem("userId", newUser.id);
            navigate("/register-options");
        } else {
            setError(newUser.title || "Noe gikk galt. Prøv igjen.");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-logo">🌱</div>
            <h1 className="auth-title">Opprett konto</h1>

            <div className="auth-form">
                <input
                    name="name"
                    placeholder="Navn"
                    onChange={handleChange}
                />
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
                <input
                    placeholder="Bekreft passord"
                    type="password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {error && <p style={{ color: "red", fontSize: "13px" }}>{error}</p>}
                <button onClick={handleRegister}>Registrer deg</button>
                <p className="auth-switch">
                    Har du allerede konto? <span onClick={() => navigate("/")}>Logg inn</span>
                </p>
            </div>
        </div>
    );
}

export default RegisterUserPage;