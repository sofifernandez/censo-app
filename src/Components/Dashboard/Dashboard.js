import React from 'react'
import { NavBar } from '../NavBar/NavBar.js'
import { AgregarPersona } from '../AgregarPersona/AgregarPersona.js'
import { ListarPersonas } from '../ListarPersonas/ListarPersonas.js' 
import { GraficoDepartamentos } from '../GraficoDepartamentos/GraficoDepartamentos.js'
import { Mapa } from '../Mapa/Mapa.js'
import { GraficoOcupacion } from '../GraficoOcupacion/GraficoOcupacion.js'


export const Dashboard = () => {
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
