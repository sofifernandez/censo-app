import React from "react";
import { useState } from "react";
import "./Login.css";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Implement your login logic here
    console.log("Username:", username);
    console.log("Password:", password);
  };

  return (
      <div class="row justify-content-center align-items-center">
          <form>
            <h2 class="text-center">Ingresar</h2>
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
            <button type="submit" class="btn btn-primary btn-block">
              Ingresar
            </button>
          </form>
        </div>
  );
};

//export default Login
