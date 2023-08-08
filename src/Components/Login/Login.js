import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";


export const Login = () => {
  const [logInInfo, setLogInInfo] = useState([]);
  const [errLogIn, setErrLogIn] = useState([]);
  const [enableAcceptButton, setEnableAcceptButton] = useState(false)
  const navigate = useNavigate();


  //SET THE FORMS***************************************************8
  const handleFormLogIn = (e) => {
    setLogInInfo({
      ...logInInfo,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (Object.keys(logInInfo).length === 2 && logInInfo.usuario.length > 0 && logInInfo.password.length > 0) {
      setEnableAcceptButton(true)
    } else {
      setEnableAcceptButton(false)
    }
  }, [logInInfo]);


  //SUBMIT FORMS-*****************************************************
  const onHandleLogIn = async (e) => {
    e.preventDefault();
    const res = await fetch("https://censo.develotion.com/login.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(logInInfo),
      
    });
    const resJSON = await res.json();
    if (resJSON.codigo !== 200) {
      setErrLogIn(resJSON.mensaje);
    } else {
      localStorage.setItem("id", resJSON.id);
      localStorage.setItem("apiKey", resJSON.apiKey);
      localStorage.setItem("usuario", logInInfo.usuario);
      navigate("/dashboard");
    }
  };

  return (
    <div className="col-8 login_form">
      <div className="container-fluid">
        <div className="row">
          <h2>Log in</h2>
        </div>
        <div className="row mb-3">
          <form control="" className="form-group">
            <div className="row mx-4">
              <input
                type="text"
                name="usuario"
                id="usuario"
                className="form__input"
                placeholder="Usuario"
                onChange={handleFormLogIn}
              />
            </div>
            <div className="row mx-4">
              <input
                type="password"
                name="password"
                id="password"
                className="form__input"
                placeholder="Contraseña"
                onChange={handleFormLogIn}
              />
            </div>
            <div className="row mx-auto text-center justify-content-center">
              <input
                type="submit"
                value="Ingresar"
                className= {enableAcceptButton ? 'btn-Primario col-6' : 'btn-disabled col-6'}
                onClick={onHandleLogIn}
                disabled={!enableAcceptButton}
              />
            </div>
          </form>
          {errLogIn !== undefined && (
            <div className="row justify-content-center text-center text-danger">
              {errLogIn}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
