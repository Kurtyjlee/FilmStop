import React from "react";
import { useState } from "react";
import axios from "axios";
import { useForm } from "../customHooks/useForm";
import { Navigate } from "react-router-dom";

export const Login = () => {

  const initialState = {
    email: "",
    password: ""
  }

  const [redirect, setRedirect] = useState(false);

  // Send value to server
  async function loginCallback(values: any) {
    await axios.post("login", {
      email: values.email,
      password: values.password
    });

    setRedirect(true);
  }

  const { handleInputChange, handleSubmit } = useForm(
    loginCallback,
    initialState
  )

  // Bring user to the main page once logged in
  if (redirect) {
    return <Navigate to={"/"} />;
  }
  
  // main
  return (
    <main className="form-login">
      <form onSubmit={handleSubmit}>
        <h1 className="login-header">Please Login</h1>
        <input 
          className="form-input" 
          placeholder="Email" 
          name="email"  
          required
          onChange={handleInputChange}
        />
        <input 
          className="form-input" 
          placeholder="Password"
          name="password"
          type="password"
          required
          onChange={handleInputChange}
        />
        <button type="submit">Login</button>
      </form>
    </main>
  )
}