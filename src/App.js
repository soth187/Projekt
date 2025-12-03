import './App.css';
import React, { useState } from "react";
import BMICalculator from "./components/BMI/BMI-Calculator"; 
import ReadyRecipes from "./components/ReadyRecipes/ReadyRecipes";
import BARCODE from './components/BARCODE-scanner/BARCODE-scanner';
import UserAccess from './components/UserAccess/UserAccess';
import ProductHistory from './components/ProductHistory/ProductHistory';

function App() {
  const [historyData, setHistoryData] = useState([]);

  const handleAddToHistory = (item) => {
    setHistoryData((prevHistoryData) => [item, ...prevHistoryData]);
  };

  return (
    <div className="App">
      <header className="main-header">
        <div className="logo">Foodly</div>

        <UserAccess />
      </header>

      <section className="section-1">

        <ProductHistory historyData={historyData} />

        <div className="scanner-wrapper">
          
          <BARCODE onAddToHistory={handleAddToHistory} />
        </div>

      </section>

      <section className="section-2">
        <div className='gif-wrapper'> 
          <img src="/gifs/dziadek.gif" alt="gif" />
        </div>        
        <div className="bmi-wrapper">
          <BMICalculator />
        </div>
        <div className="recipes-wrapper">          
          <ReadyRecipes />
        </div>
      </section>
    </div>
  );
}

export default App;
