import { useNavigate, useLocation } from "react-router-dom";

function BottomBar() {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <div className="bottom-bar">
            <button 
                className={isActive("/") ? "bottom-bar-item active" : "bottom-bar-item"} 
                onClick={() => navigate("/")}
            >
                <i className="ti ti-home"></i>
                <span>Hjem</span>
            </button>

            <button 
                className={isActive("/add") ? "bottom-bar-item active" : "bottom-bar-item"} 
                onClick={() => navigate("/add")}
            >
                <i className="ti ti-plus"></i>
                <span>Legg til</span>
            </button>

            <button 
                className={isActive("/water") ? "bottom-bar-item active" : "bottom-bar-item"} 
                onClick={() => navigate("/water")}
            >
                <i className="ti ti-droplet"></i>
                <span>Vanning</span>
            </button>

            <button 
                className={isActive("/settings") ? "bottom-bar-item active" : "bottom-bar-item"} 
                onClick={() => navigate("/settings")}
            >
                <i className="ti ti-settings"></i>
                <span>Innst.</span>
            </button>
        </div>
    );
}

export default BottomBar;