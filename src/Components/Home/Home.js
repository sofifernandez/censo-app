import React from "react";
import "./Home.css";
import { Login } from "../Login/Login.js";
import { Registro } from "../Registro/Registro.js";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logoCenso from "../logo_censo.png";


export const Home = () => {
  const [showRegister, setShowRegister] = useState(false);
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    setShowRegister(!showRegister);
  };

  useEffect(() => {
    if (localStorage.getItem("usuario") !== null) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <div className="container-fluid bg-image row mx-0">
      <div className="row main-content text-center m-auto px-0">
        <div className="col-md-4 text-center company__info align-items-center">
          {!showRegister ? (
            <button
              id="btn-Registro"
              className="col-7 mx-auto btn-Primario"
              onClick={handleRegisterClick}
            >
              {" "}
              Registrarse{" "}
            </button>
          ) : (
            <button
              className="col-7 mx-auto btn-Primario"
              onClick={handleRegisterClick}
            >
              {" "}
              Login{" "}
            </button>
          )}
          <div id="loginRegisterText">
            {!showRegister ? "¿No tienes usuario?" : "¿Ya tienes usuario?"}
          </div>
          <img className="mt-5" id="img-logo" src={logoCenso} alt="logo" />
        </div>
        {showRegister ? <Registro /> : <Login />}
      </div>
    </div>
  );
};

//export default Home
