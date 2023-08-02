import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const CantidadCensados = () => {
  const censados = useSelector((state) => state.personas.data);
  const [censadosMontevideo, setCensadosMontevideo] = useState(0);
  const [censadosInterior, setCensadosInterior] = useState(0);

  useEffect(() => {
    const filteredMontevideo = censados.filter(
      (item) => item.departamento === 3218
    );
    setCensadosMontevideo(filteredMontevideo.length);
    setCensadosInterior(censados.length - filteredMontevideo.length);
  }, [censados]);

  return (
    <div className="d-flex flex-wrap">
      <div className="header-category">
        <div className="header-links">
          <div className="header-category-tag">Censados</div>
          <div className="header-tag-cilinder text-center verde">
            {censados.length}
          </div>
        </div>
      </div>
      <div className="header-category">
        <div className="header-links">
          <div className="header-category-tag">Montevideo</div>
          <div className="header-tag-cilinder text-center verde">
            {censadosMontevideo}
          </div>
        </div>
      </div>
      <div className="header-category">
        <div className="header-links">
          <div className="header-category-tag">Interior</div>
          <div className="header-tag-cilinder text-center verde">
            {censadosInterior}
          </div>
        </div>
      </div>
      <div className="header-category">
        <div className="header-links">
          <div className="header-category-tag">Total</div>
          <div className="header-tag-cilinder text-center verde">57%</div>
        </div>
      </div>
    </div>
  );
};
