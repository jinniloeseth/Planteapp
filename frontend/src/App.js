import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PlantList from "./components/PlantList";
import AddPlantForm from "./components/AddPlantForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PlantList />} />
        <Route path="/add" element={<AddPlantForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;