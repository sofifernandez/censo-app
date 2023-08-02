import React, { useEffect, useState } from "react";
import "./NavBar.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CantidadCensados } from "../CantidadCensados/CantidadCensados.js";

export const NavBar = () => {
  //const censados = useSelector((state) => state.personas.data);
  const navigate = useNavigate();


  const handleLogOut = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <header className="header mb-5">
      <div className="heroline"></div>
      <h1 className="headerTitle">Dashboard de (usuario)</h1>
      <div className="d-flex flex-wrap">
        {/* <div className="header-category">
          <div className="header-links">
            <div className="header-category-tag">Censados</div>
            <div className="header-tag-cilinder text-center verde">
              {censados.length}
            </div>
          </div>
        </div>
        <div className="header-category">
          <div className="header-links">
            <div className="header-category-tag">Total</div>
            <div className="header-tag-cilinder text-center verde">57%</div>
          </div>
        </div> */}
        <CantidadCensados/>
        <div className="header-category">
          <div className="header-links">
            <div className="header-category-tag">24:00 hs</div>
            <div className="header-tag-circle amarillo"></div>
          </div>
        </div>
        <div className="header-category">
          <div id="btnSalir" className="header-links" onClick={handleLogOut}>
            <div className="header-category-tag">Salir</div>
            <div className="header-tag-circle rosado"></div>
          </div>
        </div>
      </div>
    </header>
  );
};
