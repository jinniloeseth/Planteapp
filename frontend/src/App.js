import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginUserPage from "./components/StartPages/LoginUserPage.js";
import RegisterUserPage from "./components/StartPages/RegisterUserPage.js";
import RegisterUserStartOptionsPage from "./components/StartPages/RegisterUserStartOptionsPage.js";
import PlantsPage from "./components/PlantsPages/PlantsPage.js";
import PlantPage from "./components/PlantsPages/PlantPage.js";
import WateringPage from "./components/WateringPages/WateringPage.js";
import CreatePlantPage from "./components/CreatePages/CreatePlantPage.js";
import SettingsPage from "./components/SettingsPages/SettingsPage.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginUserPage/>}/>
        <Route path="/register" element={<RegisterUserPage/>}/>
        <Route path="/register-options" element={<RegisterUserStartOptionsPage/>}/>

        {/* Menylinjen */}


        <Route path="/plants" element={<PlantsPage />} />
        <Route path="/watering" element={<WateringPage />} />
        <Route path="/create" element={<CreatePlantPage />} />
        <Route path="/settings" element={<SettingsPage />} />

        {/* Plante menyen */}
        <Route path="/plant/:id" element={<PlantPage />} />

        {/* Vanne menyen */}

        {/* opprette plante menyen */}

        {/* innstillinger menyen */}
        

      </Routes>
    </BrowserRouter>
  );
}

export default App;