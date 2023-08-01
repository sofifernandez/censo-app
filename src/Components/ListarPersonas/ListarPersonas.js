import React from "react";
import "./ListarPersonas.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { InfoPersona } from "../InfoPersona/InfoPersona";

export const ListarPersonas = () => {
  //const [errLista, setErrLista] = useState();
  const ocupaciones = useSelector(state => state.ocupaciones.data)
  const censados= useSelector(state => state.personas.data)

  //const [censados, setCensados] = useState(initialStateCensados);
  const [mensajeEliminar, setmensajeEliminar] = useState();
  const [filtroOcupacion, setFiltroOcupacion] = useState(undefined);
  const [censadosFiltrados, setCensadosFiltrados] = useState();



  const handleChildMessage = (message) => {
    setmensajeEliminar(message);
  };

  const handleFiltroOcupacion = (e) => {
    setFiltroOcupacion(e.target.value)
  };

  const handleLimpiarFiltro = () => {
    setFiltroOcupacion();
    setCensadosFiltrados();
  }

  useEffect(() => {
    if (filtroOcupacion !== undefined) {
      setCensadosFiltrados(censados.filter((c) => c.ocupacion === parseInt(filtroOcupacion)))
    }
  }, [filtroOcupacion, censados]);

  return (
    <div className="row col-12 col-sm-9 col-lg-7 justify-content-center">
      <div className="fs-2">LISTA DE PERSONAS </div>

      {/* {errLista !== undefined && (
        <div className="row justify-content-center text-center text-danger">
          {errLista}
        </div>
      )} */}

      {mensajeEliminar &&
        <span className={mensajeEliminar.codigo === 200 ? "alert alert-success" : "alert alert-danger"}>{mensajeEliminar.mensaje}</span>}
      {censados.length===0 ? (<div className="alert alert-warning">No hay existencias</div>)
        :
        (
          <div id="listarSection" className="mb-5 mx-auto py-3 px-0">
            <div className="row mb-3 mx-auto justify-content-evenly">
              <div className="col-3 pe-0 mx-2 listCategoryHeader">
                Nombre completo
              </div>

              <select
                id="ocuFilter"
                className="col-2 pe-0 mx-2 listCategoryHeader"
                value={filtroOcupacion}
                onChange={handleFiltroOcupacion}
              >
                <option value="">Ocupacion</option>
                {ocupaciones.map(o => <option key={o.id} value={o.id}>{o.ocupacion}</option>)}
              </select>

              <div className="col-2 pe-0 mx-2 listCategoryHeader">
                Departamento
              </div>
              {
                filtroOcupacion === undefined ?
                <div className="col-2 pe-0 mx-2 "></div> :
                <div className="col-2 pe-0 mx-2 deleteFilterButton" onClick={handleLimpiarFiltro}>Limpiar filtro</div>
              }
            </div>
            {
              censadosFiltrados === undefined ?
                censados.map((c) => (<InfoPersona {...c} key={c.id} onMessage={handleChildMessage} />))
                :
                censadosFiltrados.map((c) => (<InfoPersona {...c} key={c.id} onMessage={handleChildMessage} />))
            }
            {/* {censados.map((c) => (
              <InfoPersona {...c} key={c.id} onMessage={handleChildMessage} />))} */}
          </div>
        )}
    </div>
  );
};
