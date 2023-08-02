import React, { useEffect, useState } from "react";
import "./AgregarPersona.css";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux'
import { agregarPersona, guardarPersonas } from '../../features/personasSlice.js'

export const AgregarPersona = () => {

  const initialFormData = {
    "idUsuario": localStorage.getItem("id"),
    nombre: '',
    fechaNacimiento: '',
    departamento: '',
    ciudad: '',
    ocupacion: ''
  };

  const ocupaciones = useSelector((state) => state.ocupaciones.data);
  const departamentos = useSelector((state) => state.departamentos.data); //HABRÍA QUE ORDENAR ALABETICAMENTE?
  const [ciudades, setCiudades] = useState([]);
  const [formulario, setFormulario] = useState(initialFormData);
  const [errAgregar, setErrAgregar] = useState();
  const [succes, setSucces] = useState(false);
  const dispatch = useDispatch();


  useEffect(() => {
    fetch(
      `https://censo.develotion.com/ciudades.php?idDepartamento=${formulario.departamento}`,
      {
        method: "GET",
        body: JSON.stringify(),
        headers: {
          "Content-type": "application/json",
          apikey: localStorage.getItem("apiKey"),
          iduser: localStorage.getItem("id"),
        },
      }
    )
      .then((response) => response.json())
      .then((datos) => {
        if (datos.codigo === 200) {
          setCiudades(datos.ciudades);
        }
      });
  }, [formulario.departamento]);


  //SET THE FORMS***************************************************8

  const handleFormAgregar = (e) => {
    if (isNaN(e.target.value)) {
      setFormulario({
        ...formulario,
        [e.target.name]: e.target.value
      })
    }
    else {
      setFormulario({
        ...formulario,
        [e.target.name]: parseInt(e.target.value)
      })
    }
  };


  //SUBMIT FORMS-*****************************************************
  const onHandleAgregarPersona = async (e) => {
    e.preventDefault()
    setErrAgregar();
    setSucces();
    const res = await fetch('https://censo.develotion.com/personas.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: localStorage.getItem("apiKey"),
        iduser: localStorage.getItem("id")
      },
      body: JSON.stringify(formulario)
    })

    const resJSON = await res.json()
    console.log(resJSON)
    if (resJSON.codigo !== 200) {
      setErrAgregar(resJSON.mensaje)
    } else {
      setSucces(resJSON.mensaje);
      console.log(resJSON);
      console.log({ ...formulario, id: resJSON.idCenso })
      dispatch(agregarPersona({ ...formulario, id: resJSON.idCenso }));

      setFormulario(initialFormData);
    }
  };


  return (
    <div className="row col-12 col-sm-9 col-lg-5 justify-content-center">
      <div className="fs-2">AGREGAR PERSONA </div>
      {errAgregar && <span className="alert alert-danger">{errAgregar}</span>}
      {succes && <span className="alert alert-success">{succes}</span>}

      <form className="row justify-content-center mb-5 mx-auto mainAddPersonCard" onSubmit={onHandleAgregarPersona}>
        <input
          className="text-center fs-4 col-9 my-3"
          placeholder="Nombre completo"
          type="text"
          name="nombre"
          onChange={handleFormAgregar}
          value={formulario.nombre}
        ></input>
        <div className="col-12 row justify-content-evenly mb-3">
          <div className="col-11 col-md-5 col-lg-4 fw-bold fs-5 text-center my-auto addPersonCateg">
            Fecha de nac.
          </div>
          <input
            className="col-11 col-md-7 fs-4 text-center text-prop"
            type="date"
            id="birthdate"
            name="fechaNacimiento"
            pattern="\d{2}/\d{2}/\d{4}"
            placeholder="MM/DD/YYYY"
            required
            onChange={handleFormAgregar}
            value={formulario.fechaNacimiento}
          />
        </div>
        <div className="col-12 row justify-content-evenly mb-3">
          <div className="col-11 col-md-5 col-lg-4 fw-bold fs-5 text-center my-auto addPersonCateg">
            Departamento
          </div>
          <select
            className="slcAddPeople col-11 col-md-7 fs-4 text-center"
            name="departamento"
            onChange={handleFormAgregar}
            value={formulario.departamento}
          >
            <option value="">Seleccionar</option>
            {departamentos.map((dep) => (
              <option key={dep.id} value={dep.id}>

                {dep.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="col-12 row justify-content-evenly mb-3">
          <div className="col-11 col-md-5 col-lg-4 fw-bold fs-5 text-center my-auto addPersonCateg">
            Ciudad
          </div>
          <select
            className="slcAddPeople col-11 col-md-7 fs-4 text-center"
            onChange={handleFormAgregar}
            name="ciudad"
            value={formulario.ciudad}
          >
            <option value="">Seleccionar</option>
            {ciudades.length> 0 && ciudades.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="col-12 row justify-content-evenly mb-3">
          <div className="col-11 col-md-5 col-lg-4 fw-bold fs-5 text-center my-auto addPersonCateg">
            Ocupación
          </div>
          <select
            className="slcAddPeople col-11 col-md-7 fs-4 text-center"
            onChange={handleFormAgregar}
            name="ocupacion"
            value={formulario.ocupacion}
          >
            <option value="option_value_1">Seleccionar</option>
            {ocupaciones.map((o) => (
              <option key={o.id} value={o.id}>
                {o.ocupacion}
              </option>
            ))}
          </select>
        </div>
        <div className="row mx-auto text-center justify-content-center mb-3">
          <input type="submit" value="Agregar" className="btn-Primario col-5" />
        </div>
      </form>

    </div>
  );
};
