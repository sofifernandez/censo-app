import React from 'react'
import './InfoPersona.css'

export const InfoPersona = () => {
  return (
      <div className='mb-3 mx-auto'>
          <div className='row justify-content-evenly'>
              <div className='col-3 my-auto idListPeople'>ID: 1 </div>
              <div className="heroline col-9 my-auto"></div>
          </div>
          <div className='row justify-content-evenly'>
              <div className="col-3 pe-0 mx-2 listCategory">Pepe Perez</div>
              <div className="col-2 pe-0 mx-2 listCategory">Esudiante</div>
              <div className="col-2 pe-0 mx-2 listCategory">Montevideo</div>
              <div className="col-2 pe-0 mx-2 listCategoryDelete">Eliminar</div>
          </div>
      </div>
      
  )
}