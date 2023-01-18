import React from "react";
import { Wrapper } from "../../components/Wrapper";
import { useState, useEffect } from "react";
import axios from "axios";
import { Paginator } from "../../components/Paginator";
import { Link } from "react-router-dom";
import { Thread } from "../../models/Thread";

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
  const [threads, setThreads] = useState([]);

  // Pagination
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);

  // Animation
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    (
      async () => {
        const {data} = await axios.get(`threads`)

        setThreads(data.data);
        setLastPage(data.meta.last_page);
      }
    )()
  }, [page]);

  const select = (id: number) => {
    setSelected(selected === id ? 0 : id);
  }

  return (
    <Wrapper>
      <div className="table-responsive">
        <table className="table text-white table-sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Link</th>
            </tr>
          </thead>
          <tbody>
            {threads.map((thread: Thread) => {
              return (
                <tr key={thread.id}>
                    <td>{thread.id}</td>
                    <td>{thread.name}</td>
                    <td>
                        <Link 
                            className="btn btn-sm btn-outline-secondary text-white"
                            to={`/threads/${thread.id}`}
                        >{thread.name}</Link>
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
      </div>
    </Wrapper>
  )
}

