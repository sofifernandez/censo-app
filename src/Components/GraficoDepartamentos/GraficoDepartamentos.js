import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  // plugins: {
  //   legend: {
  //     position: "top",
  //   },
  //   title: {
  //     display: true,
  //     text: "Censados por Departamento",
  //   },
  // },
};

export const GraficoDepartamentos = () => {

 const departamentos = useSelector((state) => state.departamentos.data);
  const censados = useSelector((state) => state.personas.data);
  const [dptosCantidad, setdptosCantidad] = useState([]);
  useEffect(() => {
    const frequencyMap = {};
    censados.forEach((persona) => {
                                  const { departamento } = persona; //extracts the value of the "departamento" property using destructuring assignment and assigns it to the variable departamento.
                                  if (frequencyMap[departamento]) {
                                  frequencyMap[departamento]++; //si el departamento ya existe como key, le suma 1
                                  }
                                  else {
                                  frequencyMap[departamento] = 1; //si no existe, lo iguala a 1
                                  }
    });
    //frequencyMap --> {3203: 1, 3204:3, 3205:1, 3210:1}
    const result = Object.keys(frequencyMap).map((departamento) => ({ // crea un array de objetos, recorre el frequencyMap y para cada dpto 
    frequency: frequencyMap[departamento], //la frecuencia
    ...departamentos.find((item) => item.id === parseInt(departamento, 10)) //los datos del array de departamentos
  }));

    setdptosCantidad(result);
  }, [censados]);

console.log(dptosCantidad)

  return (
    <div className="row col-12 col-sm-9 col-lg-6">
      <div className="fs-2">CENSADOS POR DEPARTAMENTO </div>
      <Bar
        options={options}
        data={{
          labels:  dptosCantidad.map((dptos) =>dptos.nombre) ,
          datasets: [
            {
              label: "",
              data: dptosCantidad.map((dptos) => dptos.frequency),
              backgroundColor: "rgba(255, 99, 132, 0.5)",
            }
          ],
        }}
      />
    </div>
  );
};
