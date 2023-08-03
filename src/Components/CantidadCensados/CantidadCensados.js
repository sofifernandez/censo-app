import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./CantidadCensados.css"

export const CantidadCensados = () => {
  const censados = useSelector((state) => state.personas.data);
  const [censadosMontevideo, setCensadosMontevideo] = useState(0);
  const [censadosInterior, setCensadosInterior] = useState(0);
  const [totalCensados, setTotalCensados] = useState(0);

  useEffect(() => {
    const filteredMontevideo = censados.filter(
      (item) => item.departamento === 3218
    );
    setCensadosMontevideo(filteredMontevideo.length);
    setCensadosInterior(censados.length - filteredMontevideo.length);

    // totalCensados
    fetch(`https://censo.develotion.com/totalCensados.php`, {
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
        if (datos.codigo === 200) {
          setTotalCensados(((censados.length*100)/datos.total).toFixed(2));
        }
      });


  }, [censados]);

  return (
    <div className="d-flex flex-wrap">
      <div className="header-category ">
        <div className="header-links userData">
          <div className="header-category-tag">Censados</div>
          <div className="header-tag-cilinder text-center userDataNumbers">
            {censados.length}
          </div>
        </div>
      </div>
      <div className="header-category">
        <div className="header-links userData">
          <div className="header-category-tag ">Montevideo</div>
          <div className="header-tag-cilinder text-center userDataNumbers">
            {censadosMontevideo}
          </div>
        </div>
      </div>
      <div className="header-category">
        <div className="header-links userData">
          <div className="header-category-tag ">Interior</div>
          <div className="header-tag-cilinder text-center userDataNumbers">
            {censadosInterior}
          </div>
        </div>
      </div>
      <div className="header-category">
        <div className="header-links userData">
          <div className="header-category-tag ">Total (%)</div>
          <div className="header-tag-cilinder text-center userDataNumbers">
            {totalCensados}
          </div>
        </div>
      </div>
    </div>
  );
};
