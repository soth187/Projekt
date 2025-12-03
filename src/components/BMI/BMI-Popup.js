import React from "react";
import "./BMI-Calculator.css";
import "../../App.css";

const BMIPopup = ({ bmi, category }) => {
  return (
    <div id="bmi-popup" className="bmi-popup hidden">
      <button
        className="bmi-popup-exit"
        onClick={() => {
          const popup = document.getElementById("bmi-popup");
          popup.classList.add("hidden");
        }}
      ></button>

      <h1 className="bmi-popup-title">Twoje BMI</h1>
      <p className="bmi-popup-value">{bmi}</p>
      <p className="bmi-popup-category">{category}</p>
    </div>
  );
};

export default BMIPopup;
