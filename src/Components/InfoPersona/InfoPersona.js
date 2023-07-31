import React from 'react'
import './InfoPersona.css'
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux'
import { buscarOcupacion } from '../../features/ocupacionesSlice';

export const InfoPersona = ({ id, nombre, ocupacion, ciudad }) => {
  
    const [nombreOcupacion, setNombreOcupacion] = useState(); 
    const ocupaciones = useSelector(state => state.ocupaciones.data)
    const [errAgregar, setErrAgregar] = useState();
    const [succes, setSucces] = useState(false);
    
    const nombreOcupacionDos = useSelector(state => state.ocupaciones.nombre)
    const dispatch = useDispatch();
    console.log(nombreOcupacionDos)

    /*useEffect(() => {
    const filteredData = ocupaciones.filter((item) => item.id === parseInt(ocupacion));
        setNombreOcupacion(filteredData[0].ocupacion);
        dispatch(buscarOcupacion(ocupacion))
  }, [ocupacion, ocupaciones]);*/

    console.log(ocupaciones)


 /*    const onHandleAgregarPersona = async (e) => {
        e.preventDefault()
        setErrAgregar();
        setSucces();
          const res = await fetch('https://censo.develotion.com/personas.php' , {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                apikey: localStorage.getItem("apiKey"),
                iduser: localStorage.getItem("id")
              },
              body: JSON.stringify( formulario )
          })
  
        const resJSON = await res.json()
        console.log(resJSON)
          if (resJSON.codigo!==200) {
              setErrAgregar(resJSON.mensaje)
          } else {
            setSucces(true);
        }
      };
 */

      const onHandleEliminarPersona = async (e) => {
        e.preventDefault()
        setErrAgregar();
        setSucces();
        const res = await fetch(`https://censo.develotion.com/personas.php?idCenso=${id}` , {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              apikey: localStorage.getItem("apiKey"),
              iduser: localStorage.getItem("id")
            },
            body: JSON.stringify()
        })
        const resJSON = await res.json()
        console.log(resJSON)
        if (resJSON.codigo!==200) {
            setErrAgregar(resJSON.mensaje)
        } else {
          setSucces(true);
      }
      };


  return (
      <div className='mb-3 mx-auto'>
          <div className='row justify-content-evenly'>
              <div className='col-3 my-auto idListPeople'>ID: {id} </div>
              <div className="heroline col-9 my-auto"></div>
          </div>
          <div className='row justify-content-evenly'>
              <div className="col-3 pe-0 mx-2 listCategory">{ nombre}</div>
              <div className="col-2 pe-0 mx-2 listCategory">{nombreOcupacion }</div>
              <div className="col-2 pe-0 mx-2 listCategory">{ ciudad}</div>
              <div className="col-2 pe-0 mx-2 ">
                <input type="submit" value="Eliminar" className="col-12 pe-0 mx-2 listCategoryDelete"  onClick={onHandleEliminarPersona}/>
              </div>
          </div>
      </div>
      
  )
}