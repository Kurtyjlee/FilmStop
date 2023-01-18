import React from "react";
import { Wrapper } from "../../components/Wrapper";
import { useState, useEffect } from "react";
import axios from "axios";
import { Post } from "../../models/Post";
import { Paginator } from "../../components/Paginator";
import { Link } from "react-router-dom";
import { Comments } from "../../models/comments";

// For animation
const hide = {
  maxHeight: 0,
  transition: '200ms ease-in'
}

const show = {
  maxHeight: '150px',
  transition: '200ms ease-out'
}

export const Threads = () => {
  const [posts, setPosts] = useState([]);

  // Pagination
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);

  // Animation
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    (
      async () => {
        const {data} = await axios.get(`posts?page=${page}`)

        setPosts(data.data);
        setLastPage(data.meta.last_page);
      }
    )()
  }, [page]);

  const select = (id: number) => {
    setSelected(selected === id ? 0 : id);
  }

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
            {posts.map((post: Post) => {
              return (
                <>
                  <tr key={post.id}>
                    <td>{post.id}</td>
                    <td><img src={post.image} width="50"/></td>
                    <td>{post.title}</td>
                    <td>{post.description}</td>
                    <td>{post.total_likes}</td>
                    {/* Actions */}
                    <td>
                      <div className="btn-group mr-3">
                        <Link 
                          className="btn btn-sm btn-outline-secondary text-white"
                          to={`posts/${post.id}/edit`}
                        >Edit</Link>
                        <a 
                          className="btn btn-sm btn-outline-secondary text-white"
                          href="#!"
                          onClick={() => del(post.id)}
                        >Delete</a>
                        <a 
                          className="btn btn-sm btn-outline-secondary text-white"
                          href="#!"
                          onClick={() => select(post.id)}
                        >View</a>
                        <Link 
                        className="btn btn-sm btn-outline-secondary text-white"
                          to={`/posts/${post.id}/comment_create`}
                        >Comment</Link>
                      </div>
                    </td>
                  </tr>
                  {/* comments */}
                  <tr>
                    <td colSpan={10}>
                      <div className="overflow-hidden" style={selected === post.id ? show : hide}>
                        <table className="table table-sm text-white">
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>description</th>
                              <th>likes</th>
                            </tr>
                          </thead>
                          <tbody>
                          {post.comments.map((comment: Comments) => {
                            return (
                              <tr>
                                <td>{comment.id}</td>
                                <td>{comment.description}</td>
                                <td>{comment.total_likes}</td>
                              </tr>
                            )
                          })}
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
