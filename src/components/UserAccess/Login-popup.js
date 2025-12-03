import React from "react";
import "./UserAccess.css";

const LoginPopup = ({ isOpen, onClose }) => {
  if (!isOpen) return null; // nic nie renderuj, jeśli ma być zamknięte

  return (
    <div className="auth-popup-overlay">
      <div id="login-popup" className="auth-popup">
        <button className="auth-popup-exit" onClick={onClose}>
          ✕
        </button>

        <h1 className="auth-popup-title">Logowanie</h1>

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

        <button className="auth-popup-button">Zaloguj</button>
      </div>
    </div>
  );
};

export default LoginPopup;
