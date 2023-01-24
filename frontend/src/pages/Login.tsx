import "./../styles/PostCreate.scss"

import React from "react";
import { useState } from "react";
import axios from "axios";
import { useForm } from "../customHooks/useForm";
import { Link, Navigate } from "react-router-dom";

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
    <main className="create-post-container">
      <form className="main-container" onSubmit={handleSubmit}>
        <h1 className="post-label">Login</h1>
        <hr />
        <label className="form-label">Email</label>
        <input 
          className="form-input" 
          placeholder="Email" 
          name="email"  
          required
          onChange={handleInputChange}
        />
        <label className="form-label">Password</label>
        <input 
          className="form-input" 
          placeholder="Password"
          name="password"
          type="password"
          required
          onChange={handleInputChange}
        />
        <button className="action-button-white" type="submit">Login</button>
      </form>
      <div>
        <span className="label">Don't have an account yet? </span>
        <Link to="/register">Register here!</Link>
      </div>
    </main>
  )
}