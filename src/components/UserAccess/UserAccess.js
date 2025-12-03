import React, { useState } from "react";
import "./UserAccess.css";
import "../../App.css";
import LoginPopup from "./Login-popup";
import RegisterPopup from "./Register-popup";

const UserAccess = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  return (
    <>
      <div className="header-buttons">
        <button
          className="btn-login"
          onClick={() => setIsLoginOpen(true)}
        >
          Logowanie
        </button>

        <button
          className="btn-register"
          onClick={() => setIsRegisterOpen(true)}
        >
          Rejestracja
        </button>
      </div>

      <LoginPopup
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
      />

      <RegisterPopup
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
      />
    </>
  );
};

export default UserAccess;
