import React from "react";
import "./InfoPersona.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { eliminarPersona } from "../../features/personasSlice";

export const InfoPersona = ({ id, nombre, ocupacion, departamento }) => {
  const [nombreOcupacion, setNombreOcupacion] = useState([]);
  const [nombreDpto, setNombreDpto] = useState([]);
  const ocup = useSelector((state) => state.ocupaciones.data);
  const dptos = useSelector((state) => state.departamentos.data);
  const dispatch = useDispatch();

   useEffect(() => {

    const filteredOcupacion = ocup.find((item) => item.id === parseInt(ocupacion));
    const filteredDptos = dptos.find((item) => item.id === parseInt(departamento));
    if (filteredOcupacion.ocupacion !== "" && filteredDptos.nombre !== "") {
      setNombreOcupacion(filteredOcupacion.ocupacion);
      setNombreDpto(filteredDptos.nombre)
    }

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
    if (resJSON.codigo === 200) {
      dispatch(eliminarPersona(id));
    }

  };

  return (
    <div className="mb-3 mx-auto">
      <div className="row mx-auto">
        <div className="col-3 my-auto idListPeople">ID: {id} </div>
        <div className="heroline col-8 my-auto"></div>
      </div>
      <div className="row justify-content-evenly mx-auto">
        <div className="col-3 pe-0 mx-1 listCategory">{nombre}</div>
        <div className="col-3 pe-0 mx-1 listCategory">{nombreOcupacion}</div>
        <div className="col-3 pe-0 mx-1 listCategory">{nombreDpto}</div>
        <div className="col-2 pe-0 mx-1 ">
          <input
            type="submit"
            value="Eliminar"
            className="col-12 pe-0 listCategoryDelete fs-6"
            onClick={onHandleEliminarPersona}
          />
        </div>
      </div>
    </div>
  );
};
