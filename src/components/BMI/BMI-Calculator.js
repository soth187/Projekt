import React, { useState } from "react";
import "./BMI-Calculator.css";
import "../../App.css";
import BMIPopup from "./BMI-Popup";

const BMICalculator = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState("");

  const handleCalculate = () => {
    if (!weight || !height) return;

    const h = height / 100;
    const result = (weight / (h * h)).toFixed(1);
    setBmi(result);

    let cat = "";
    if (result < 18.5) cat = "Niedowaga ❌";
    else if (result < 25) cat = "Waga prawidłowa ✅";
    else if (result < 30) cat = "Nadwaga ❌";
    else cat = "Otyłość ❌";

    setCategory(cat);

    const popup = document.getElementById("bmi-popup");
    popup.classList.remove("hidden");

    setWeight("");
    setHeight("");
  };

  return (
    <div className="bmi-calculator">
      <h1 className="bmi-title">BMI</h1>
      <br />

      <input
        className="bmi-input"
        type="number"
        placeholder="np. 76kg"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
      />

      <input
        className="bmi-input"
        type="number"
        placeholder="np. 178cm"
        value={height}
        onChange={(e) => setHeight(e.target.value)}
      />

      <button className="bmi-button" onClick={handleCalculate}>
        Oblicz
      </button>

      <BMIPopup bmi={bmi} category={category} />
    </div>
  );
};

export default BMICalculator;
