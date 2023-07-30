import React from "react";
import "./AgregarPersona.css";

export const AgregarPersona = () => {
  return (
    <div className="row col-12 col-sm-9 col-lg-5 justify-content-center">
      <div className="fs-2">AGREGAR PERSONA </div>
      <div className="row justify-content-center mb-5 mx-auto mainAddPersonCard">
        <input
          className="text-center fs-4 col-9 my-3"
          placeholder="Nombre completo"
          type="text"
        ></input>
        <div className="col-12 row justify-content-evenly mb-3">
          <div className="col-11 col-md-5 col-lg-4 fw-bold fs-5 text-center my-auto addPersonCateg">
            Fecha de nac.
          </div>
          <input
            className="col-11 col-md-7 fs-4 text-center text-prop"
            type="date"
            id="birthdate"
            name="birthdate"
            pattern="\d{2}/\d{2}/\d{4}"
            placeholder="MM/DD/YYYY"
            required
          />
        </div>
        <div className="col-12 row justify-content-evenly mb-3">
          <div className="col-11 col-md-5 col-lg-4 fw-bold fs-5 text-center my-auto addPersonCateg">
            Departamento
          </div>
          <select className="slcAddPeople col-11 col-md-7 fs-4 text-center">
            <option value="option_value_1">Seleccionar</option>
            <option value="option_value_2">Option 2</option>
          </select>
        </div>
        <div className="col-12 row justify-content-evenly mb-3">
          <div className="col-11 col-md-5 col-lg-4 fw-bold fs-5 text-center my-auto addPersonCateg">
            Ciudad
          </div>
          <select className="slcAddPeople col-11 col-md-7 fs-4 text-center">
            <option value="option_value_1">Seleccionar</option>
            <option value="option_value_2">Option 2</option>
          </select>
        </div>
        <div className="col-12 row justify-content-evenly mb-3">
          <div className="col-11 col-md-5 col-lg-4 fw-bold fs-5 text-center my-auto addPersonCateg">
            Ocupación
          </div>
          <select className="slcAddPeople col-11 col-md-7 fs-4 text-center">
            <option value="option_value_1">Seleccionar</option>
            <option value="option_value_2">Option 2</option>
          </select>
        </div>
      </div>
    </div>
  );
};
