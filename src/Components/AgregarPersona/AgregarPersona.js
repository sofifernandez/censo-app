import React, { useEffect, useState } from "react";
import "./AgregarPersona.css";
import { useSelector } from "react-redux";

export const AgregarPersona = () => {
  const ocupaciones = useSelector((state) => state.ocupaciones.data);
  const departamentos = useSelector((state) => state.departamentos.data); //HABRÍA QUE ORDENAR ALABETICAMENTE?
  const [ciudades, setCiudades] = useState([]);
  const [formulario, setFormulario] = useState({ "idUsuario": localStorage.getItem("id") });
  const [errAgregar, setErrAgregar] = useState();
  const [succes, setSucces] = useState(false);


// {
//     "idUsuario": 6,
//     "nombre": "Persona 12",
//     "departamento": 44,
//     "ciudad": 22,
//     "fechaNacimiento": "2001-09-29",
//     "ocupacion": 3
// }




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
        setCiudades(datos.ciudades);
      });
  }, [formulario.departamento]);

 
  //SET THE FORMS***************************************************8
    const handleFormAgregar = (e) => {
        setFormulario({
            ...formulario,
            [e.target.name]: e.target.value
        })
  };
  
  //SUBMIT FORMS-*****************************************************
    const onHandleAgregarPersona = async (e) => {
      e.preventDefault()
      setErrAgregar();
      setSucces();
        const res = await fetch('https://censo.develotion.com/personas.php?idUsuario=' + localStorage.getItem('id'), {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              apikey: localStorage.getItem("apiKey"),
              iduser: localStorage.getItem("id")
            },
            body: JSON.stringify( formulario )
        })

      const resJSON = await res.json()
      console.log(resJSON)
        if (resJSON.codigo!==200) {
            setErrAgregar(resJSON.mensaje)
        } else {
          setSucces(true);
      }
    };







  return (
    <div className="row col-12 col-sm-9 col-lg-5 justify-content-center">
      <div className="fs-2">AGREGAR PERSONA </div>
      {errAgregar && <span className="alert alert-danger">{errAgregar}</span>}
      {succes && <span className="alert alert-success">Persona agregada con éxito</span>}
      <div className="row justify-content-center mb-5 mx-auto mainAddPersonCard">
        <input
          className="text-center fs-4 col-9 my-3"
          placeholder="Nombre completo"
          type="text"
          name="nombre"
          onChange={handleFormAgregar}
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
          >
            <option value="">Seleccionar</option>
            {departamentos.map((dep) => (
              <option key={dep.id} value={dep.id}>
                {" "}
                {dep.nombre}{" "}
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
            //value={formulario.ciudad}
            onChange={handleFormAgregar}
            name="ciudad"
          >
            <option value="">Seleccionar</option>
            {ciudades.map((c) => (
              <option key={c.id} value={c.id}>
                {" "}
                {c.nombre}{" "}
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
            //value={ocupaSeleccionada.id}
            onChange={handleFormAgregar}
            name="ocupacion"
          >
            <option value="option_value_1">Seleccionar</option>
            {ocupaciones.map((o) => (
              <option key={o.id} value={o.id}>
                {" "}
                {o.ocupacion}{" "}
              </option>
            ))}
          </select>
        </div>
        <div className="row mx-auto text-center justify-content-center mb-3">
          <input type="submit" value="Agregar" className="btn-Primario col-5"  onClick={onHandleAgregarPersona }/>
        </div>
      </div>
    </div>
  );
};
