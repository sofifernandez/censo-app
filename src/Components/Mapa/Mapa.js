import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});
export const Mapa = () => {
  const departamentos = useSelector((state) => state.departamentos.data);
  const censados = useSelector((state) => state.personas.data);
  const [cantidad, setCantidad] = useState([]);
  const [dptosCantidad, setdptosCantidad] = useState([]);

  /*useEffect(() => {
  const arr1 = censados.map((obj) => obj.departamento);
  const arr2 = departamentos.map((obj) => obj.id);

  const filteredPorDepartamento = arr1.filter(dep => arr2.includes(dep));

    setCantidad(filteredPorDepartamento.length);
    console.log(cantidad)
  }, [censados]); */

  useEffect(() => {
    const frequencyMap = {};
    censados.forEach((persona) => {
      const { departamento } = persona;
      if (frequencyMap[departamento]) {
        frequencyMap[departamento]++;
      }
      else {
        frequencyMap[departamento] = 1;
      }
    });

    const result = Object.keys(frequencyMap).map((departamento) => ({
    departamento: parseInt(departamento, 10),
    frequency: frequencyMap[departamento],
    ...departamentos.find((item) => item.id === parseInt(departamento, 10))
  }));

    setdptosCantidad(result);
  }, [censados]);


  return (
    <div className="row col-12 col-sm-9 col-lg-6 justify-content-center">
      <div className="fs-2">MAPA </div>
      <div>
        <MapContainer
          center={[-33, -56]}
          zoom={6}
          scrollWheelZoom={false}
          style={{ height: "400px", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {dptosCantidad.map((dep) => (
            <Marker key={dep.id} position={[dep.latitud, dep.longitud]}>
              <Popup>
                {dep.nombre}:{" "}
                {dep.frequency}{" "}
                personas censadas
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};
