import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const GraficoOcupacion = () => {
  const ocupaciones = useSelector((state) => state.ocupaciones.data);
  const censados = useSelector((state) => state.personas.data);
  const [ocupaCantidad, setOcupaCantidad] = useState([]);

  useEffect(() => {
    const frequencyMap = {};
    censados.forEach((persona) => {
      const { ocupacion } = persona;
      if (frequencyMap[ocupacion]) {
        frequencyMap[ocupacion]++;
      } else {
        frequencyMap[ocupacion] = 1;
      }
    });

    const result = Object.keys(frequencyMap).map((ocupacion) => ({
      frequency: frequencyMap[ocupacion],
      ...ocupaciones.find((item) => item.id === parseInt(ocupacion, 10)),
    }));

    setOcupaCantidad(result);
  }, [censados, ocupaciones]);

  return (
    <div className="row col-12 col-sm-9 col-md-6 justify-content-center text-center mb-3">
      <div className="fs-2">CENSADOS POR OCUPACIÓN</div>
      {censados.length === 0 ? (
        <div className="alert alert-warning">No hay existencias</div>
      ) : (
        <div className="row col-lg-7 justify-content-center">
          <Pie
            data={{
              labels: ocupaCantidad.map((o) => o.ocupacion),
              datasets: [
                {
                  label: "",
                  data: ocupaCantidad.map((o) => o.frequency),
                  backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                  ],
                  borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                  ],
                  borderWidth: 2,
                },
              ],
            }}
          />
        </div>
      )}
    </div>
  );
};
