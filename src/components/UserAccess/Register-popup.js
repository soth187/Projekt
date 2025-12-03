import React from "react";
import "./UserAccess.css";

const RegisterPopup = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="auth-popup-overlay">
      <div id="register-popup" className="auth-popup">
        <button className="auth-popup-exit" onClick={onClose}>
          ✕
        </button>

        <h1 className="auth-popup-title">Rejestracja</h1>

        <input
          className="auth-popup-input"
          type="text"
          placeholder="Imię"
        />
        <input
          className="auth-popup-input"
          type="email"
          placeholder="E-mail"
        />
        <input
          className="auth-popup-input"
          type="password"
          placeholder="Hasło"
        />

        <button className="auth-popup-button">Zarejestruj</button>
      </div>
    </div>
  );
};

export default RegisterPopup;
