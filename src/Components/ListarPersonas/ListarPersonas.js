import React from "react";
import "./ListarPersonas.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { InfoPersona } from "../InfoPersona/InfoPersona";

export const ListarPersonas = () => {
  const [censados, setCensados] = useState([]);
  const [errLista, setErrLista] = useState();

  const ocupaciones=useSelector(state=>state.ocupaciones.data)

  useEffect(() => {
    const apikey = localStorage.getItem("apiKey");
    const user = localStorage.getItem("id");
    fetch(`https://censo.develotion.com/personas.php?idUsuario=`+user, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        apikey: apikey,
        idUser: user,
      },
    })
      .then((r) => r.json())
      .then((datos) => {
        if (datos.codigo !== 200) {
          setErrLista(datos.mensaje);
        } else {
          setCensados(datos.personas);
        }
      });
  }, []);



  return (
    <div className="row col-12 col-sm-9 col-lg-7 justify-content-center">
      <div className="fs-2">LISTA DE PERSONAS </div>
      {errLista !== undefined && (
        <div className="row justify-content-center text-center text-danger">
          {errLista}
        </div>
      )}
      {censados.length === 0 ? (
        <div className="alert alert-warning">No hay existencias</div>
      ) : (
        <div id="listarSection" className="mb-5 mx-auto py-3 px-0">
          <div className="row mb-3 mx-auto justify-content-evenly">
            <div className="col-3 pe-0 mx-2 listCategoryHeader">
              Nombre completo
            </div>

            <select
              id="ocuFilter"
              className="col-2 pe-0 mx-2 listCategoryHeader"
              >
                <option value="option_value_1">Ocupacion</option>
                {ocupaciones.map(ocupacion => <option value={ocupacion.id}>{ocupacion.ocupacion }</option>)}
            </select>

            <div className="col-2 pe-0 mx-2 listCategoryHeader">
              Departamento
            </div>
            <div className="col-2 pe-0 mx-2 "></div>
          </div>
            {censados.map((c) => (
              <InfoPersona {...c} id={c.id} />
            ))}
        </div>
      )}
    </div>
  );
};
