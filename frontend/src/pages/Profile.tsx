import axios from "axios";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { Wrapper } from "../components/Wrapper";

export const Profile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  useEffect(() => {
    (
      async () => {
        const {data} = await axios.get("user");

        setFirstName(data.first_name);
        setLastName(data.last_name);
        setEmail(data.email);
      }
    )();
  }, []);

  const infoSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    await axios.put("users/info", {
      "first_name": firstName,
      "last_name": lastName,
      "email": email
    });
  }

  const passwordSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    await axios.put("users/password", {
      "password": password,
      "password_confirm": passwordConfirm
    });
  }

  return (
    <Wrapper>
      <h3 className="text-white">Account Information</h3>
      <form onSubmit={infoSubmit}>
        <div className="mb-3">
          <label className="text-white">First Name</label>
          <input 
            className="form-control" 
            defaultValue={firstName}
            onChange={e => setFirstName(e.target.value)}
          /> 
        </div>
        <div className="mb-3">
          <label className="text-white">Last Name</label>
          <input 
            className="form-control" 
            defaultValue={lastName}
            onChange={e => setLastName(e.target.value)}
          /> 
        </div>
        <div className="mb-3">
          <label className="text-white">Email Name</label>
          <input 
            className="form-control" 
            defaultValue={email}
            onChange={e => setEmail(e.target.value)}
          /> 
        </div>
        <button 
          className="btn btn-outline-secondary text-white">Save</button>
      </form>

      <h3 className="text-white">Change password</h3>
      <form onSubmit={passwordSubmit}>
        <div className="mb-3">
          <label className="text-white">Password</label>
          <input 
            type="password" 
            className="form-control"
            onChange={e => setPassword(e.target.value)} 
          /> 
        </div>
        <div className="mb-3">
          <label className="text-white">Last Name</label>
          <input 
            type="password" 
            className="form-control" 
            onChange={e => setPasswordConfirm(e.target.value)}
          /> 
        </div>
        <button className="btn btn-outline-secondary text-white">Save</button>
      </form>
    </Wrapper>
  );
}