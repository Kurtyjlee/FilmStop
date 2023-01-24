import './../styles/PostCreate.scss';

import axios from "axios";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { Wrapper } from "../components/Wrapper";

export const Settings = () => {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  
  useEffect(() => {
    (
      async () => {
        const {data} = await axios.get("user");

        setUsername(data.user_name);
        setEmail(data.email);
      }
    )();
  }, [])

  const infoSubmit =  async (e: SyntheticEvent) => {
    e.preventDefault()

    await axios.put("user/info", {
      user_name: username,
      email: email
    })
  }

  const passwordSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()

    await axios.put("user/password", {
      password: password,
      password_confirm: passwordConfirm
    })
  }

  return (
    <Wrapper >
      <div className="create-post-container">
        <form className="main-container" onSubmit={infoSubmit}>
          <h3 className="post-label">Account Information</h3>
          <hr/>
          <div className="inner-main-container">
            <label className="form-label">Username</label>
            <input 
              className="form-input"
              defaultValue={username}
              onChange={e => setUsername(e.target.value)}
            />
          </div >
          <div className="inner-main-container">
            <label className="form-label">Email</label>
            <input 
              className="form-input"
              defaultValue={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <button className="action-button-white">Save</button>
        </form>

        <form className="main-container" onSubmit={passwordSubmit}>
          <h3 className="post-label">Change Password</h3>
          <hr/>
          <div className="inner-main-container">
            <label className="form-label">Password</label>
            <input 
              type="password"
              className="form-input"
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className="inner-main-container">
            <label className="form-label">Confirm Password</label>
            <input 
              type="password"
              className="form-input"
              onChange={e => setPasswordConfirm(e.target.value)}
            />
          </div>
          <button className="action-button-white">Save</button>
        </form>
      </div>
    </Wrapper>
  )
}

export default Settings;
