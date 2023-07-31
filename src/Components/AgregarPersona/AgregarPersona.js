import React, { useEffect, useState } from "react";
import "./AgregarPersona.css";

export const AgregarPersona = () => {


  //////////// SELECTOR DEPARTAMENTOS ///////////

  const [departamentos, setDepartamentos] = useState([]);
  const [depSeleccionado, setDepSeleccionado] = useState([]);

  useEffect(() => {
    fetch("https://censo.develotion.com/departamentos.php", {
      method: 'GET',
      body: JSON.stringify(),
      headers: {
        'Content-type': 'application/json',
        'apikey': localStorage.getItem("apiKey"),
        'iduser': localStorage.getItem("id")

      },
    })
      .then((response) => response.json())
      .then((datos) => {
        setDepartamentos(datos.departamentos);
      })
  }, []);

  const selectorDep = (e) => {
    setDepSeleccionado(e.target.value); //Aca me queda el ID del Departamento
  }

  //////////// SELECTOR CIUDADES ///////////

  const [ciudades, setCiudades] = useState([]);
  const [ciuSeleccionado, setCiuSeleccionado] = useState([]);

  useEffect(() => {
    fetch(`https://censo.develotion.com/ciudades.php?idDepartamento=${depSeleccionado}`, {
      method: 'GET',
      body: JSON.stringify(),
      headers: {
        'Content-type': 'application/json',
        'apikey': localStorage.getItem("apiKey"),
        'iduser': localStorage.getItem("id")

      },
    })
      .then((response) => response.json())
      .then((datos) => {
        setCiudades(datos.ciudades);
      })
  }, [depSeleccionado]);

  const selectorCiu = (e) => {
    setCiuSeleccionado(e.target.value); //Aca me queda el ID de la ciudad
  }

  //////////// SELECTOR CIUDADES ///////////

  const [ocupaciones, setOcupaciones] = useState([]);
  const [ocupaSeleccionada, setOcupaSeleccionado] = useState([]);

  useEffect(() => {
    fetch(`https://censo.develotion.com/ocupaciones.php`, {
      method: 'GET',
      body: JSON.stringify(),
      headers: {
        'Content-type': 'application/json',
        'apikey': localStorage.getItem("apiKey"),
        'iduser': localStorage.getItem("id")

      },
    })
      .then((response) => response.json())
      .then((datos) => {
        console.log(datos.ocupaciones);
        setOcupaciones(datos.ocupaciones)
      })
  }, []);

  const selectorOcupa = (e) => {
    setOcupaSeleccionado(e.target.value); //Aca me queda el ID de la Ocupacion
  }




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
          <select className="slcAddPeople col-11 col-md-7 fs-4 text-center" value={depSeleccionado.id} onChange={selectorDep}>
            <option value="">Seleccionar</option>
            {departamentos.map((dep => (<option key={dep.id} value={dep.id}> {dep.nombre} </option>)))}

          </select>
        </div>
        <div className="col-12 row justify-content-evenly mb-3">
          <div className="col-11 col-md-5 col-lg-4 fw-bold fs-5 text-center my-auto addPersonCateg">
            Ciudad
          </div>
          <select className="slcAddPeople col-11 col-md-7 fs-4 text-center" value={ciuSeleccionado.id} onChange={selectorCiu}>
            <option value="">Seleccionar</option>
            {ciudades.map((c => (<option key={c.id} value={c.id}> {c.nombre} </option>)))}
          </select>
        </div>
        <div className="col-12 row justify-content-evenly mb-3">
          <div className="col-11 col-md-5 col-lg-4 fw-bold fs-5 text-center my-auto addPersonCateg">
            Ocupación
          </div>
          <select className="slcAddPeople col-11 col-md-7 fs-4 text-center" value={ocupaSeleccionada.id} onChange={selectorOcupa}>
            <option value="option_value_1">Seleccionar</option>
            {ocupaciones.map((o => (<option key={o.id} value={o.id}> {o.ocupacion} </option>)))}
          </select>
        </div>
        <div className="row mx-auto text-center justify-content-center mb-3">
              <input type="submit" value="Ingresar" className="btn-Primario col-6"  />
        </div>
      </div>
    </div>
  );
};
