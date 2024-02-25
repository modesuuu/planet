
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import React,{useState,} from "react";
import './App.css';
import Home from "./componen/home";
import Main from "./componen/main";
import About from "./componen/about";

export default function App(){

  const [selectedPlanet, setSelectedPlanet] = useState(null);

  const handlePlanetClick = (planet) => {
    setSelectedPlanet(planet);
  };


  return(
    <>
    
    {selectedPlanet ? (
        <Main  planet={selectedPlanet} onBack={() => setSelectedPlanet(null)} />
      ) : (
        <Home onPlanetClick={handlePlanetClick} />
      )}
    
    </>
  )
}