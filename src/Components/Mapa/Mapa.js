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

    const result= departamentos.map((departamento) => ({ // recorre el array de departamentos, replica la informacion de cada uno y 
                                                         // lo une con lo que dice el frequencyMap 
    ...departamento, 
      frequency: frequencyMap[departamento.id] || 0, //si no existe, pone 0 en frequency
    }));

    setdptosCantidad(result);
  }, [censados]);

 return (
    <div className="col-12 col-sm-9 col-lg-6 ">
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
