import { useNavigate, useLocation } from "react-router-dom";

function WateringPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    const plants = [
        {
            id: 1,
            name: "Monstera",
            species: "Monstera Deliciosa",
            lastWatered: "2026-07-28",
            wateringIntervalDays: 7,
        },
        {
            id: 2,
            name: "Aloe Vera",
            species: "Aloe Vera",
            lastWatered: "2026-08-08",
            wateringIntervalDays: 14,
        },
        {
            id: 3,
            name: "Thai Con",
            species: "Thai Constellation",
            lastWatered: "2026-08-04",
            wateringIntervalDays: 7,
        },
        {
            id: 4,
            name: "Kaktus",
            species: "Cactaceae",
            lastWatered: "2026-08-10",
            wateringIntervalDays: 21,
        },
    ];

    const getDaysUntilWatering = (lastWatered, intervalDays) => {
        const lastWateredDate = new Date(lastWatered);
        const nextWatering = new Date(lastWateredDate);
        nextWatering.setDate(nextWatering.getDate() + intervalDays);
        const today = new Date();
        const diffTime = nextWatering - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    const getStatus = (days) => {
        if (days < 0) return { label: `Forfalt med ${Math.abs(days)} dager`, color: "#C0392B" };
        if (days === 0) return { label: "Skal vannes i dag!", color: "#E67E22" };
        if (days <= 2) return { label: `Om ${days} dager`, color: "#E67E22" };
        return { label: `Om ${days} dager`, color: "#4A7856" };
    };

    const sortedPlants = [...plants].sort((a, b) =>
        getDaysUntilWatering(a.lastWatered, a.wateringIntervalDays) -
        getDaysUntilWatering(b.lastWatered, b.wateringIntervalDays)
    );

    const overdue = sortedPlants.filter(p => getDaysUntilWatering(p.lastWatered, p.wateringIntervalDays) < 0);
    const today = sortedPlants.filter(p => getDaysUntilWatering(p.lastWatered, p.wateringIntervalDays) === 0);
    const upcoming = sortedPlants.filter(p => getDaysUntilWatering(p.lastWatered, p.wateringIntervalDays) > 0);

    const renderPlant = (plant) => {
        const days = getDaysUntilWatering(plant.lastWatered, plant.wateringIntervalDays);
        const status = getStatus(days);

        return (
            <div key={plant.id} className="watering-card">
                <div className="watering-card-info">
                    <h3>{plant.name || plant.species}</h3>
                    <p style={{ color: status.color }}>{status.label}</p>
                </div>
                <button className="water-now-button" onClick={() => {}}>
                    💧
                </button>
            </div>
        );
    };

    return (
        <div className="page-container">
            <h2>Vanning</h2>

            {overdue.length > 0 && (
                <div className="watering-section">
                    <p className="watering-section-label">🔴 Trenger vanning</p>
                    {overdue.map(renderPlant)}
                </div>
            )}

            {today.length > 0 && (
                <div className="watering-section">
                    <p className="watering-section-label">🟡 I dag</p>
                    {today.map(renderPlant)}
                </div>
            )}

            {upcoming.length > 0 && (
                <div className="watering-section">
                    <p className="watering-section-label">🟢 Kommer snart</p>
                    {upcoming.map(renderPlant)}
                </div>
            )}

            <div className="bottom-bar">
                <button className={isActive("/home") ? "bottom-bar-item active" : "bottom-bar-item"} onClick={() => navigate("/plants")}>
                    🌱 <span>Planter</span>
                </button>
                <button className={isActive("/watering") ? "bottom-bar-item active" : "bottom-bar-item"} onClick={() => navigate("/watering")}>
                    💧 <span>Vanning</span>
                </button>
                <button className={isActive("/createPlant") ? "bottom-bar-item active" : "bottom-bar-item"} onClick={() => navigate("/create")}>
                    ➕ <span>Opprett</span>
                </button>
                <button className={isActive("/settings") ? "bottom-bar-item active" : "bottom-bar-item"} onClick={() => navigate("/settings")}>
                    ⚙️ <span>Innst.</span>
                </button>
            </div>

        </div>

        
    );
}

export default WateringPage;