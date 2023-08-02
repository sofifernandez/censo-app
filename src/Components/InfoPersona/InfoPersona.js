import React from "react";
import "./InfoPersona.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
//import { buscarOcupacion } from "../../features/ocupacionesSlice";
import { eliminarPersona } from "../../features/personasSlice";

export const InfoPersona = ({ id, nombre, ocupacion, departamento, onMessage }) => {
  const [nombreOcupacion, setNombreOcupacion] = useState();
  const [nombreDpto, setNombreDpto] = useState();
  const ocup = useSelector((state) => state.ocupaciones.data);
  const dptos=useSelector((state) => state.departamentos.data);
  const [mensaje, setMensaje] = useState();
  const dispatch = useDispatch();


   useEffect(() => {
    
    const filteredOcupacion = ocup.find((item) => item.id === parseInt(ocupacion));
    setNombreOcupacion(filteredOcupacion.ocupacion);
    const filteredDptos = dptos.find((item) => item.id === parseInt(departamento));
    setNombreDpto(filteredDptos.nombre)
    //dispatch(buscarOcupacion(parseInt(ocupacion)))
  }, [ocupacion, ocup, departamento, dptos]);
 
  const onHandleEliminarPersona = async (e) => {
    e.preventDefault();
    const res = await fetch(
      `https://censo.develotion.com/personas.php?idCenso=${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          apikey: localStorage.getItem("apiKey"),
          iduser: localStorage.getItem("id"),
        },
        body: JSON.stringify(),
      }
    );
    const resJSON = await res.json();
    setMensaje(resJSON)
    sendMessageToParent();
    if (resJSON.codigo === 200) {
      dispatch(eliminarPersona(id)); 
    }
    
  };

    const sendMessageToParent = () => {
    onMessage(mensaje); 
  };

  return (
    <div className="mb-3 mx-auto">
      <div className="row justify-content-evenly">
        <div className="col-3 my-auto idListPeople">ID: {id} </div>
        <div className="heroline col-9 my-auto"></div>
      </div>
      <div className="row justify-content-evenly">
        <div className="col-3 pe-0 mx-2 listCategory">{nombre}</div>
        <div className="col-2 pe-0 mx-2 listCategory">{nombreOcupacion}</div>
        <div className="col-2 pe-0 mx-2 listCategory">{nombreDpto}</div>
        <div className="col-2 pe-0 mx-2 ">
          <input
            type="submit"
            value="Eliminar"
            className="col-12 pe-0 mx-2 listCategoryDelete"
            onClick={onHandleEliminarPersona}
          />
        </div>
      </div>
    </div>
  );
};
