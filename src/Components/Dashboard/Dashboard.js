import React from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { NavBar } from '../NavBar/NavBar.js'
import { AgregarPersona } from '../AgregarPersona/AgregarPersona.js'
import { ListarPersonas } from '../ListarPersonas/ListarPersonas.js' 
import { GraficoDepartamentos } from '../GraficoDepartamentos/GraficoDepartamentos.js'
import { Mapa } from '../Mapa/Mapa.js'
import { GraficoOcupacion } from '../GraficoOcupacion/GraficoOcupacion.js'
import { guardarOcupaciones } from '../../features/ocupacionesSlice.js'
import { guardarDptos } from '../../features/departamentosSlice.js'
import { guardarPersonas } from '../../features/personasSlice.js'


export const Dashboard = () => {
  
  const dispatch = useDispatch();

  //OBTENER OCUPACIONES, una vez, cuando se carga el dashboard
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
        dispatch(guardarOcupaciones(datos.ocupaciones))
      })
  }, [dispatch]);


  //OBTENER DEPARTAMENTOS, una vez, cuando se carga el dashboard
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
        dispatch(guardarDptos(datos.departamentos));
      })
  }, [dispatch]);

  //OBTENER PERSONAS
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
        if (datos.codigo === 200) {
          dispatch(guardarPersonas(datos.personas));
        } 
      });
  });






  return (
    <>
      <NavBar />
      <div className='container-fluid row justify-content-evenly align-items-baseline'>
        <AgregarPersona />
        <ListarPersonas />
        <GraficoDepartamentos />
        <Mapa />
        <GraficoOcupacion/>
      </div>
    </>
  )
}
