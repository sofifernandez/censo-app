import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import "./Login.css";

//sofiCenso 

export const Login = () => {
  const [logInInfo, setLogInInfo] = useState();
  const [errLogIn, setErrLogIn] = useState();
  const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("usuario") !== null) {
            navigate("/dashboard");
        }
      }, [])


   //SET THE FORMS***************************************************8
    const handleFormLogIn = (e) => {
        setLogInInfo({
            ...logInInfo,
            [e.target.name]: e.target.value
        })
    };

  
  //SUBMIT FORMS-*****************************************************
    const onHandleLogIn = async (e) => {
        e.preventDefault()
        const res = await fetch('https://censo.develotion.com/login.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( logInInfo )
        })

      const resJSON = await res.json()
      console.log(resJSON)
        if (resJSON.codigo!==200) {
            setErrLogIn(resJSON.mensaje)
        } else {
          localStorage.setItem("id", resJSON.id);
          localStorage.setItem("apiKey", resJSON.apiKey);
          navigate("/dashboard")
      }
    };

  return (
      <div className="col-md-8 col-xs-12 col-sm-12 login_form">
				<div className="container-fluid">
					<div className="row">
						<h2>Log in</h2>
					</div>
					<div className="row mb-3">
						<form control="" className="form-group">
							<div className="row mx-4">
								<input type="text" name="usuario" id="usuario" className="form__input" placeholder="Usuario" onChange={handleFormLogIn}/>
							</div>
							<div className="row mx-4">
								<input type="password" name="password" id="password" className="form__input" placeholder="Contraseña" onChange={handleFormLogIn}/>
							</div>
							<div className="row mx-auto text-center justify-content-center">
              <input type="submit" value="Ingresar" className="btn-Primario col-6" onClick={onHandleLogIn } />
            </div>
          </form>
          {errLogIn !==undefined && <div className="row justify-content-center text-center text-danger">{ errLogIn }</div>}
					</div>
				</div>
			</div>
  );
};

