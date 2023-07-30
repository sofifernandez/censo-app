import React from "react";
import "./ListarPersonas.css";
import { InfoPersona } from "../InfoPersona/InfoPersona";

export const ListarPersonas = () => {
  return (
    <div className="row col-12 col-sm-9 col-lg-7 justify-content-center">
      <div className="fs-2">LISTAR PERSONAS </div>
      <div id="listarSection" className="mb-5 mx-auto py-3 px-0">
        <div className="row mb-3 mx-auto justify-content-evenly">
          <div className="col-3 pe-0 mx-2 listCategoryHeader">
            Nombre completo
          </div>

          <select id="ocuFilter" className="col-2 pe-0 mx-2 listCategoryHeader">
            <option value="option_value_1">Ocupación</option>
            <option value="option_value_2">Option 2</option>
          </select>

          <div className="col-2 pe-0 mx-2 listCategoryHeader">Departamento</div>
          <div className="col-2 pe-0 mx-2 "></div>
        </div>
        <InfoPersona />
        <InfoPersona />
        <InfoPersona />
        <InfoPersona />
      </div>
    </div>
  );
};
