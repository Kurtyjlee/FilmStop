import React from "react";
import { Wrapper } from "../../components/Wrapper";
import { useState, useEffect } from "react";
import axios from "axios";
import { Post } from "../../models/Post";
import { Paginator } from "../../components/Paginator";
import { Link } from "react-router-dom";

export const Posts = () => {
  const [posts, setPosts] = useState([]);

  // Pagination
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
      <div className="table-responsive">
        <table className="table text-white table-sm">
          <thead>
            <tr>
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
                <>
                  <tr key={p.id}>
                    <td>{p.id}</td>
                    <td><img src={p.image} width="50"/></td>
                    <td>{p.title}</td>
                    <td>{p.description}</td>
                    <td>{p.likes}</td>
                    {/* Actions */}
                    <td>
                      <div className="btn-group mr-2">
                        <a 
                          className="btn btn-sm btn-outline-secondary text-white"
                          href={`posts/${p.id}/edit`}
                        >Edit</a>
                        <a 
                          className="btn btn-sm btn-outline-secondary text-white"
                          href="#"
                          onClick={() => del(p.id)}
                        >Delete</a>
                      </div>
                    </td>
                  </tr>
                  {/* comments */}
                  <tr>
                    <td colSpan={5}>
                      <div>
                        <table className="table table-sm text-white">
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>description</th>
                              <th>likes</th>
                            </tr>
                          </thead>
                          <tbody>
                            <p>To be continued</p>
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                </>
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
            <Link className="btn btn-sm btn-outline-secondary" to="/posts/create">add</Link>
          </li>
        </ul>
      </div>
    </Wrapper>
  )
}

