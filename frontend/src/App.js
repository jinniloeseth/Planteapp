import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginUserPage from "./components/StartPages/LoginUserPage.js";
import RegisterUserPage from "./components/StartPages/RegisterUserPage.js";
import RegisterUserStartOptionsPage from "./components/StartPages/RegisterUserStartOptionsPage.js";
import PlantsPage from "./components/PlantsPages/PlantsPage.js";
import PlantPage from "./components/PlantsPages/PlantPage.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginUserPage/>}/>
        <Route path="/register" element={<RegisterUserPage/>}/>
        <Route path="/register-options" element={<RegisterUserStartOptionsPage/>}/>

        {/* Menylinjen */}

        <Route path="/plants" element={<PlantsPage />} />
        <Route path="/watering" element={<PlantsPage />} />
        <Route path="/createPlant" element={<PlantsPage />} />
        <Route path="/settings" element={<PlantsPage />} />

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