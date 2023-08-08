import React, { useEffect, useState } from "react";
import "./NavBar.css";
import { useNavigate } from "react-router-dom";
import { CantidadCensados } from "../CantidadCensados/CantidadCensados.js";

export const NavBar = () => {
  const targetDate = new Date("2023-08-31");
  const [daysRemaining, setDaysRemaining] = useState(0);
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    //Días restantes
    const currentDate = new Date();
    const timeRemaining = targetDate.getTime() - currentDate.getTime();
    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    setDaysRemaining(days);
  }, []);

  return (
    <header className="header">
      <div className="heroline"></div>
      <div className="d-flex flex-wrap justify-content-between">
        <div>
          <h1 className="headerTitle mb-0 me-1">
          Dashboard de {localStorage.getItem("usuario")}
          </h1>
          <div>(dias restantes: {daysRemaining})</div>
        </div>
        <div className="header-category">
          <div id="btnSalir" className="header-links" onClick={handleLogOut}>
            <div className="header-category-tag">Salir</div>
            <div className="header-tag-circle text-center rosado">x</div>
          </div>
        </div>
      </div>
      <div className="d-flex flex-wrap">
        <CantidadCensados />
      </div>
    </header>
  );
};
