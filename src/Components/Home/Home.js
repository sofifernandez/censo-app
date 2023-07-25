import React from "react";
import "./Home.css";
import { Login } from "../Login/Login.js";
import { Registro } from "../Registro/Registro.js";
import { useState } from "react";

export const Home = () => {
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleRegisterClick = () => {
    setShowRegister(true);
    setShowLogin(false);
  };

  const handleLoginClick = () => {
    setShowRegister(false);
    setShowLogin(true);
  };
  return (
    <div class="container-fluid row justify-content-center bg-image">
      <div className="row justify-content-center col-8 registerLoginSection">
        <div className="col-3">
          <button onClick={handleRegisterClick}>Register</button>
          <button onClick={handleLoginClick}>Login</button>
        </div>
        <div className="col-9" >
          {showRegister ? <Registro /> : null}
          {showLogin ? <Login /> : null}
        </div>
      </div>
    </div>
  );
};

//export default Home
