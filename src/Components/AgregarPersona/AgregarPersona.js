import React, { useEffect, useState } from "react";
import "./AgregarPersona.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { agregarPersona } from "../../features/personasSlice.js";

export const AgregarPersona = () => {
  const initialFormData = {
    idUsuario: localStorage.getItem("id"),
    nombre: "",
    fechaNacimiento: "",
    departamento: "",
    ciudad: "",
    ocupacion: "",
  };

  const ocupaciones = useSelector((state) => state.ocupaciones.data);
  const departamentos = useSelector((state) => state.departamentos.data); //HABRÍA QUE ORDENAR ALABETICAMENTE?
  const [ciudades, setCiudades] = useState([]);
  const [formulario, setFormulario] = useState(initialFormData);
  const [errAgregar, setErrAgregar] = useState(false);
  const [succes, setSucces] = useState(false);
  const [isCompleteForm, setIsCompleteForm] = useState(false);
  const [esMayorDeEdad, setEsMayorDeEdad] = useState(false);
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

  //SET THE FORM***************************************************8
  const handleFormAgregar = (e) => {
    // if (isNaN(e.target.value)) {
    //   setFormulario({
    //     ...formulario,
    //     [e.target.name]: e.target.value,
    //   });
    // } else {
    //   setFormulario({
    //     ...formulario,
    //     [e.target.name]: parseInt(e.target.value),
    //   });
    // }


    if (e.target.name === "departamento" || e.target.name === "ciudad" || e.target.name === "ocupacion") {
      setFormulario({
        ...formulario,
        [e.target.name]: parseInt(e.target.value),
      });
    } else {
      setFormulario({
        ...formulario,
        [e.target.name]: e.target.value,
      });
    }
    if(e.target.name === "fechaNacimiento"){
      const fecha = e.target.value;
      setEsMayorDeEdad(esMayor(fecha));
    }
  };


  //Fecha nacimiento *****************************************************
  const esMayor = (fechaNacimiento) => {
    const fechaNacimientoDate = new Date(fechaNacimiento);
    const hoy = new Date();
    const edad = hoy.getFullYear() - fechaNacimientoDate.getFullYear();
    return edad >= 18;
  };

 
  //CHECKEAR QUE EL FORM ESTÉ COMPLETO
  useEffect(() => {
    if (Object.values(formulario).every((value) => !!value)) {
      setIsCompleteForm(true);
    } else {
      setIsCompleteForm(false);
    }
  }, [formulario]);

  //SUBMIT FORMS-*****************************************************
  const onHandleAgregarPersona = async (e) => {
    e.preventDefault();
    setErrAgregar(false);
    setSucces(false);
    const res = await fetch("https://censo.develotion.com/personas.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: localStorage.getItem("apiKey"),
        iduser: localStorage.getItem("id"),
      },
      body: JSON.stringify(formulario),
    });

    const resJSON = await res.json();
    if (resJSON.codigo !== 200) {
      setErrAgregar(resJSON.mensaje);
    } else {
      setSucces(resJSON.mensaje);
      dispatch(agregarPersona({ ...formulario, id: resJSON.idCenso }));
      setFormulario(initialFormData);
    }
    setTimeout(() => {
      setErrAgregar(false);
      setSucces(false);
    }, 3000);
  };


  return (
    <div className="row col-12 col-sm-11 col-lg-5 justify-content-center">
      <div className="fs-2">AGREGAR PERSONA </div>
      <form
        className="row justify-content-center mx-auto px-0 mainAddPersonCard"
        onSubmit={onHandleAgregarPersona}
      >
        <input
          className="text-center fs-4 col-9 my-3"
          placeholder="Nombre completo"
          type="text"
          name="nombre"
          onChange={handleFormAgregar}
          value={formulario.nombre}
          required
        ></input>
        <div className="col-12 row justify-content-evenly mb-3">
          <div className="col-6 fw-bold fs-4 text-center my-auto addPersonCateg">
            Fecha de nac.
          </div>
          <input
            className="col-9 col-md-5 fs-4 text-center text-prop"
            type="date"
            id="birthdate"
            name="fechaNacimiento"
            pattern="\d{2}/\d{2}/\d{4}"
            placeholder="MM/DD/YYYY"
            required
            onChange={ handleFormAgregar}

            value={formulario.fechaNacimiento}
          />
        </div>
        <div className="col-12 row justify-content-evenly mb-3">
          <div className="col-6 fw-bold fs-4 text-center my-auto addPersonCateg">
            Departamento
          </div>
          <select
            className="slcAddPeople col-9 col-md-5 fs-4 text-center"
            name="departamento"
            onChange={handleFormAgregar}
            value={formulario.departamento}
            required
          >
            <option value="">Seleccionar</option>
            {departamentos.length > 0 &&
              departamentos.map((dep) => (
                <option key={dep.id} value={dep.id}>
                  {dep.nombre}
                </option>
              ))}
          </select>
        </div>
        <div className="col-12 row justify-content-evenly mb-3">
          <div className="col-6 fw-bold fs-4 text-center my-auto addPersonCateg">
            Ciudad
          </div>
          <select
            className="slcAddPeople col-9 col-md-5 fs-4 text-center"
            onChange={handleFormAgregar}
            name="ciudad"
            value={formulario.ciudad}
            required
          >
            <option value="">Seleccionar</option>
            {ciudades.length > 0 &&
              ciudades.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nombre}
                </option>
              ))}
          </select>
        </div>
        <div className="col-12 row justify-content-evenly mb-3">
          <div className="col-6 fw-bold fs-4 text-center my-auto addPersonCateg">
            Ocupación
          </div>
          <select
            className="slcAddPeople col-9 col-md-5 fs-4 text-center"
            onChange={handleFormAgregar}
            name="ocupacion"
            value={formulario.ocupacion}
            required
          >
            <option value="">Seleccionar</option>
            {esMayorDeEdad ? (
              ocupaciones.length > 0 &&
              ocupaciones.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.ocupacion}
                </option>
              ))
            ) : (
              <option value="5">Estudiante</option>
            )}
          </select>
        </div>
        <div className="row mx-auto text-center justify-content-center mb-3">
          <input type="submit" value="Agregar" className={isCompleteForm ? 'btn-Primario col-5' : 'btn-disabled col-5'} disabled={!isCompleteForm} />
        </div>
      </form>
      <div className={succes ? 'alert alert-success' : 'alert'}>{succes}</div>
      <div className={errAgregar && 'alert alert-danger'}>{errAgregar}</div>
      {/* {errAgregar && <span className="alert alert-danger">{errAgregar}</span>}
      {succes && <span className="alert alert-success">{succes}</span>} */}
    </div>
  );
};
