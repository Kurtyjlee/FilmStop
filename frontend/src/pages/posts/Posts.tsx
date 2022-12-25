import "./Posts.scss";

import React from "react";
import { Wrapper } from "../../components/Wrapper";
import { useState, useEffect } from "react";
import axios from "axios";
import { Post } from "../../models/Post";
import { Paginator } from "../../components/Paginator";
import { Link } from "react-router-dom";

export const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);

  useEffect(() => {
    (
      async () => {
        const {data} = await axios.get(`posts?page=${page}`)

        setPosts(data.data);
        setLastPage(data.meta.last_page);
      }
    )()
  }, [page]);

  const del = async (id:number) => {
    if (window.confirm("Are you sure you want to delete?")) {
      await axios.delete(`posts/${id}`);

      setPosts(posts.filter((p: Post) => p.id !== id));
    }
  }

  return (
    <Wrapper>
      <div className="post-table">
        <table>
          <thead>
            <tr className="table-row">
              <th>#</th>
              <th>Image</th>
              <th>Description</th>
              <th>Title</th>
              <th>Likes</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((p: Post) => {
              return (
                <tr className = "table-row" key={p.id}>
                  <td>{p.id}</td>
                  <td><img src={p.image} width="50"/></td>
                  <td>{p.title}</td>
                  <td>{p.description}</td>
                  <td>{p.likes}</td>
                  <td>
                    <div className="bottom-nav-item">
                      <a href={`posts/${p.id}/edit`}
                      >Edit</a>
                      <a href="#"
                        onClick={() => del(p.id)}
                      >Delete</a>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      <div className="bottom-bar">
        <Paginator page={page} lastPage={lastPage} pageChanged={setPage}/>
        <ul className="bottom-nav-list">
          <li className="bottom-nav-item">
            <Link to="/posts/create">add</Link>
          </li>
        </ul>
      </div>
    </Wrapper>
  )
}
