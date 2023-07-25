import React from 'react'

export const Registro = () => {
  return (
      <div class="row justify-content-center align-items-center">
        
          <form>
            <h2 class="text-center">Registro</h2>
            <div class="form-group mb-2">
              <input
                type="text"
                class="form-control input-bottom-border"
                placeholder="Username"
                required
              />
            </div>
            <div class="form-group">
              <input
                type="password"
                class="form-control input-bottom-border"
                placeholder="Password"
                required
              />
            </div>
            <button type="button" class="btn btn-outline-primary btn-block">
              Aceptar
            </button>
          </form>
        </div>

    
  )
}

//export default Registro