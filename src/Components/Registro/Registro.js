import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Registro.css";

export const Registro = () => {
  const [registerInfo, setRegisterInfo] = useState([]);
  const [errRegister, setErrRegister] = useState([]);
  const [enableRegisterButton, setEnableRegisterButtonn] = useState(false);
	 const navigate = useNavigate();


  //SET THE FORMS***************************************************8
  const handleFormRegister = (e) => {
    setRegisterInfo({
      ...registerInfo,
      [e.target.name]: e.target.value,
    });
  };

    useEffect(() => {
    if (Object.keys(registerInfo).length === 2 && registerInfo.usuario.length > 0 && registerInfo.password.length > 0) {
      setEnableRegisterButtonn(true)
    } else {
      setEnableRegisterButtonn(false)
    }
  }, [registerInfo]);

  //SUBMIT FORMS-*****************************************************
  const onHandleRegister = async (e) => {
    e.preventDefault();
    const res = await fetch("https://censo.develotion.com/usuarios.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerInfo),
    });

    const resJSON = await res.json();
    console.log(resJSON);
    if (resJSON.codigo !== 200) {
      setErrRegister(resJSON.mensaje);
	}
	else {
      localStorage.setItem("id", resJSON.id);
      localStorage.setItem("apiKey", resJSON.apiKey);
      localStorage.setItem("usuario", registerInfo.usuario);
      navigate("/dashboard");
    }
  };

  return (
    <div className="col-8 login_form ">
      <div className="container-fluid">
        <div className="row">
          <h2>Registrarse</h2>
        </div>
        <div className="row mb-3">
          <form control="" className="form-group">
            <div className="row mx-4">
              <input
                type="text"
                name="usuario"
                id="usuario-register"
                className="form__input"
                placeholder="Usuario"
                onChange={handleFormRegister}
              />
            </div>
            <div className="row mx-4">
              <input
                type="password"
                name="password"
                id="password-register"
                className="form__input"
                placeholder="Contraseña"
                onChange={handleFormRegister}
              />
            </div>
            <div className="row mx-auto text-center justify-content-center">
              <input
                type="submit"
                value="Aceptar"
                className= {enableRegisterButton ? 'btn-Registro col-6' : 'btn-disabled col-6'}
                onClick={onHandleRegister}
                disabled={!enableRegisterButton}
              />
            </div>
          </form>
          {errRegister !== undefined && (
            <div className="row justify-content-center text-center text-danger">
              {errRegister}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

//export default Registro
