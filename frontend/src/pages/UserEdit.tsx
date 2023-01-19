import React, { SyntheticEvent, useEffect } from "react";
import { Wrapper } from "../components/Wrapper";
import { useState } from "react";
import axios from "axios";
import { Role } from "../models/Role";
import { Navigate, useParams } from "react-router-dom";

export const UserEdit = () => {

  const [user_name, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role_id, setRoleId] = useState("");

  const [roles, setRoles] = useState([]);
  const [redirect, setRedirect] = useState(false);

  // user id
  let id: any = useParams();
  let userId:any = parseInt(id.id);

  // Getting the roles
  useEffect(() => {
    (
      async () => {
        const response = await axios.get("roles");
        setRoles(response.data);

        const {data} = await axios.get(`users/${userId}`);

        setUsername(data.user_name);
        setEmail(data.email);
        setRoleId(data.role_id);
      }
    )()
  }, [userId]);

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    let userRoleId = parseInt(role_id);

    await axios.put(`users/${userId}`, {
      "user_name": user_name,
      "email": email,
      "role_id": userRoleId
    })

    setRedirect(true);
  }

  if (redirect) {
    return <Navigate to={"/users"} />
  }

  return (
    <Wrapper>
      <main className="form-register">
        <form onSubmit={submit}>
          <input 
            className="form-input" 
            defaultValue={user_name}
            placeholder="First Name"
            name="first_name"  
            required 
            onChange={e => setUsername(e.target.value)}
          />

          <input 
            className="form-input" 
            defaultValue={email}
            placeholder="Email" 
            name="email"  
            required 
            onChange={e => setEmail(e.target.value)}
          />

          <select
            className="form-input" 
            value={role_id}
            name="role_id"
            required
            onChange={e => setRoleId(e.target.value)}
          >
            {roles.map((r: Role) => {
              return (
                <option key={r.id} value={r.id}>{r.name}</option>
              );
            })}
          </select>

          <button type="submit">Update</button>

        </form>
      </main>
    </Wrapper>
  );
}
