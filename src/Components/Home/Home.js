import React from "react";
import "./Home.css";
import { Login } from "../Login/Login.js";
import { Registro } from "../Registro/Registro.js";
import { useState } from "react";
import logoCenso from '../logo_censo.png';
//import imgCenso from '../censo.jpg';

export const Home = () => {
  const [showRegister, setShowRegister] = useState(false);

  const handleRegisterClick = () => {
    setShowRegister(!showRegister);
  };


  return (
    <div className="container-fluid bg-image row mx-0">
      <div className="row main-content text-center m-auto px-0">
        <div className="col-md-4 text-center company__info align-items-center">
          <button className="col-7 mx-auto btn-Primario" onClick={handleRegisterClick}>
            {!showRegister ? "Registarse": "Login"}
          </button>
          <div id="loginRegisterText">{!showRegister ? "No tienes usuario? Regístrate aquí.": "Ya tienes usuario? Ingresa aquí." }</div>
          <img className="mt-5" id="img-logo" src={logoCenso} alt="logo" />
        </div>
        {showRegister ? <Registro /> : <Login />}
      </div>
    </div>
  );
};

//export default Home
