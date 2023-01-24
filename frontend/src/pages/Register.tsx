import "./../styles/PostCreate.scss"

import axios from "axios";
import React, { useState } from "react";
import { useForm } from "../customHooks/useForm";
import { Navigate } from "react-router-dom";

export const Register = () => {
  
  // All fields blank
  const initialState = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirm: ""
  };

  const [registered, setRegistered] = useState(false);

  async function registerCallback(values: any) {
    // send values to database
    await axios.post("register", {
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
      password: values.password,
      password_confirm: values.password_confirm,
    })

    // Let the page know that user has registered
    setRegistered(true);
    
  }

  const { handleInputChange, handleSubmit } = useForm(
    registerCallback,
    initialState
  );
  
  // After registering, navigate to the login page
  if (registered) {
    return <Navigate to={'/login'} />;
  }

  // main
  return (
    <main className="create-post-container">
      <form className="main-container" onSubmit={handleSubmit}>
        <h1 className="post-label">Register</h1>
        <hr />
        <label className="form-label">Username</label>
        <input 
          className="form-input" 
          placeholder="Username"
          name="user_name"  
          required 
          onChange={handleInputChange}
        />
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
        <label className="form-label">Confirm Password</label>
        <input 
          className="form-input" 
          placeholder="Confirm Password"
          name="password_confirm"
          type="password"   
          required
          onChange={handleInputChange}
        />
        <button className="action-button-white" type="submit">Register</button>

      </form>

    </main>
  )
}
