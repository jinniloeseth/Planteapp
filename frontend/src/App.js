import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PlantList from "./components/PlantList";
import AddPlantForm from "./components/AddPlantForm";
import TopBar from "./components/TopBar";
import BottomBar from "./components/BottomBar";
import Settings from "./components/Settings";
import Watering from "./components/Watering";

function App() {
  return (
    <BrowserRouter>
    
      <TopBar />
      <Routes>
        <Route path="/" element={<PlantList />} />
        <Route path="/add" element={<AddPlantForm />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/water" element={<Watering />} />
      </Routes>
      <BottomBar />
    </BrowserRouter>
  );
}

export default App;