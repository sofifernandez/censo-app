import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavBar } from "../NavBar/NavBar.js";
import { AgregarPersona } from "../AgregarPersona/AgregarPersona.js";
import { ListarPersonas } from "../ListarPersonas/ListarPersonas.js";
import { GraficoDepartamentos } from "../GraficoDepartamentos/GraficoDepartamentos.js";
import { Mapa } from "../Mapa/Mapa.js";
import { GraficoOcupacion } from "../GraficoOcupacion/GraficoOcupacion.js";
import { guardarOcupaciones } from "../../features/ocupacionesSlice.js";
import { guardarDptos } from "../../features/departamentosSlice.js";
import { guardarPersonas } from "../../features/personasSlice.js";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import './Dashboard.css'

export const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("usuario") === null) {
      navigate("/");
    }
  }, []);

  const dispatch = useDispatch();
  const ocupaciones = useSelector((state) => state.ocupaciones.data);
  const censados = useSelector((state) => state.personas.data);
  const departamentos = useSelector((state) => state.departamentos.data);

  //OBTENER OCUPACIONES, una vez, cuando se carga el dashboard
  useEffect(() => {
    fetch(`https://censo.develotion.com/ocupaciones.php`, {
      method: "GET",
      body: JSON.stringify(),
      headers: {
        "Content-type": "application/json",
        apikey: localStorage.getItem("apiKey"),
        iduser: localStorage.getItem("id"),
      },
    })
      .then((response) => response.json())
      .then((datos) => {
        console.log(datos);
        if (datos.codigo === 200) {
          dispatch(guardarOcupaciones(datos.ocupaciones));
        }
      });
  }, [dispatch]);

  //OBTENER DEPARTAMENTOS, una vez, cuando se carga el dashboard
  useEffect(() => {
    fetch("https://censo.develotion.com/departamentos.php", {
      method: "GET",
      body: JSON.stringify(),
      headers: {
        "Content-type": "application/json",
        apikey: localStorage.getItem("apiKey"),
        iduser: localStorage.getItem("id"),
      },
    })
      .then((response) => response.json())
      .then((datos) => {
        if (datos.codigo === 200 && datos.departamentos !== undefined) {
          dispatch(guardarDptos(datos.departamentos));
        }
      });
  }, [dispatch]);

  //OBTENER PERSONAS
  useEffect(() => {
    const apikey = localStorage.getItem("apiKey");
    const user = localStorage.getItem("id");
    fetch(`https://censo.develotion.com/personas.php?idUsuario=` + user, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        apikey: apikey,
        idUser: user,
      },
    })
      .then((r) => r.json())
      .then((datos) => {
        if (datos.codigo === 200 && datos.personas !== undefined) {
          dispatch(guardarPersonas(datos.personas));
        }
      });
  }, [dispatch]);

  return (
    <>
      {ocupaciones.length > 0 &&
      departamentos.length > 0 &&
      censados !== undefined ? (
        <>
          <NavBar />
            <div className="row container-fluid justify-content-center">
              <div className="container-fluid row justify-content-evenly align-items-baseline">
            <AgregarPersona />
              <ListarPersonas />
            </div>
            <div
              id="sectionDepartamentos"
              className="col-11 container-fluid row justify-content-evenly align-items-center"
            >
              <GraficoDepartamentos />
              <Mapa />
            
            <GraficoOcupacion />
          </div>
          </div>
        </>
      ) : (
        <div className="alert alert-info">Cargando...</div>
      )}
    </>
  );
};
