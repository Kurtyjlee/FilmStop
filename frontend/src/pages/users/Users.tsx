// Styles
import "./Users.scss";

// Dependencies
import React, { useEffect, useState } from "react";
import { Wrapper } from "../../components/Wrapper";
import axios from "axios";
import { User } from "../../models/User";
import { Paginator } from "../../components/Paginator";
import { Link } from "react-router-dom";

export const Users = () => {

  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);

  useEffect(() => {
    (
      async () => {
        const {data} = await axios.get(`users?page=${page}`);

        setUsers(data.data);
        setLastPage(data.meta.last_page);
      }
    )();
  }, [page]);

  const del = async (id: number) => {
    if (window.confirm('Are you sure you want to delete?')) {
      await axios.delete(`users/${id}`);

      // Remove the user that we just deleted from the state
      setUsers(users.filter((u: User) => u.id !== id));
    }
  }

  return (
    <Wrapper>
      <div className="user-table">
        <table>
          <thead>
            <tr className="table-row">
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: User) => {
              // Returns an html
              return (
                <tr key={user.id} className="table-row">
                  <td>{user.id}</td>
                  <td>{user.user_name}</td>
                  <td>{user.email}</td>
                  <td>{user.role.name}</td>
                  <td>
                    <div className="bottom-nav-item">
                      <a href={`users/${user.id}/edit`}
                      >Edit</a>
                      <a href="#!"
                        onClick={() => del(user.id)}
                      >Delete</a>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      
      <div className="bottom-bar">
        <Paginator page={page} lastPage={lastPage} pageChanged={setPage}/>
        <ul className="bottom-nav-list">
          <li className="bottom-nav-item">
            <Link to="/users/create">add</Link>
          </li>
        </ul>
      </div>
    </Wrapper>
  )
}
