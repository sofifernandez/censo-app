import React from 'react';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);


export const GraficoOcupacion = () => {
  const ocupaciones = useSelector((state) => state.ocupaciones.data);
  const censados = useSelector((state) => state.personas.data);
  const [ocupaCantidad, setocupaCantidad] = useState([]);
  console.log(ocupaciones)

  useEffect(() => {
    const frequencyMap = {};
    censados.forEach((persona) => {
      const { ocupacion } = persona;
      if (frequencyMap[ocupacion]) {
        frequencyMap[ocupacion]++; //si el departamento ya existe como key, le suma 1
      }
      else {
        frequencyMap[ocupacion] = 1; //si no existe, lo iguala a 1
      }
    });
    //frequencyMap --> {3203: 1, 3204:3, 3205:1, 3210:1}
    const result = Object.keys(frequencyMap).map((ocupacion) => ({ // crea un array de objetos, recorre el frequencyMap y para cada dpto 
      frequency: frequencyMap[ocupacion], //la frecuencia
      ...ocupaciones.find((item) => item.id === parseInt(ocupacion, 10)) //los datos del array de ocupaciones
    }));

    setocupaCantidad(result);
  }, [censados]);




  return (
    <div className="row col-12 col-sm-9 col-lg-6 justify-content-center text-center">
      <div className="fs-2">CENSADOS POR OCUPACIÓN</div>
      <div className='row justify-content-center'>
        <Pie data={{
          labels: ocupaCantidad.map(o => o.ocupacion),
          datasets: [
            {
              label: "",
              data: ocupaCantidad.map(o => o.frequency),
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
              borderWidth: 2,
            },
          ],
        }} />
      </div>
    </div>
  )
}

