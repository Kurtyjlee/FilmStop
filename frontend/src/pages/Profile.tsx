import axios from "axios";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { Wrapper } from "../components/Wrapper";

export const Profile = () => {

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
            <h3 className="mb-3 text-white">Account Information</h3>
            <form className="mb-3 text-white" onSubmit={infoSubmit}>
                <div >
                    <label >Username</label>
                    <input 
                        className="form-control"
                        defaultValue={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label>Email</label>
                    <input 
                        className="form-control"
                        defaultValue={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <button className="btn btn-outline-secondary text-white">Save</button>
            </form>

            <h3 className="mb-3 text-white">Change Password</h3>
            <form className="mb-3 text-white" onSubmit={passwordSubmit}>
                <div className="mb-3">
                    <label>Password</label>
                    <input 
                        type="password"
                        className="form-control"
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label>Confirm Password</label>
                    <input 
                        type="password"
                        className="form-control"
                        onChange={e => setPasswordConfirm(e.target.value)}
                    />
                </div>
                <button className="btn btn-outline-secondary text-white">Save</button>
            </form>
        </Wrapper>
    )
}

export default Profile;
