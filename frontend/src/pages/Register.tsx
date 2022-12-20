import axios from "axios";
import React, { useState } from "react";
import { useForm } from "../customHooks/useForm";
import { Navigate } from "react-router-dom";

export const Register = () => {
  
  // All fields blank first
  const initialState = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirm: ""
  };

  const [registered, setRegistered] = useState({
    registered: false
  })

  async function registerCallback(values: any) {
    // send values to database
    await axios.post("http://localhost:8000/api/register", {
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
      password: values.password,
      password_confirm: values.password_confirm,
    })

    // Let the page know that user has registered
    setRegistered({
      registered: true
    })
    
  }

  const { values, handleInputChange, handleSubmit } = useForm(
    registerCallback,
    initialState
  );
  
  // After registering, navigate to the login page
  if (registered.registered) {
    return <Navigate to={'/login'} />;
  }

  // main
  return (
    <main className="form-register">
      <form onSubmit={handleSubmit}>
        <h1 className="register-header">Please register</h1>

        <input 
          className="form-input" 
          placeholder="First Name"
          name="first_name"  
          required 
          onChange={handleInputChange}
        />

        <input 
          className="form-input" 
          placeholder="Last Name"
          name="last_name"   
          required 
          onChange={handleInputChange}
        />

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
        
        <input 
          className="form-input" 
          placeholder="Confirm Password"
          name="password_confirm"
          type="password"   
          required
          onChange={handleInputChange}
        />

        <button type="submit">Register</button>

      </form>

    </main>
  )
}
