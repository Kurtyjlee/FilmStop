import "./../../styles/PostContainer.scss";

import React from "react";
import { Wrapper } from "../../components/Wrapper";
import { useState, useEffect } from "react";
import axios from "axios";
import { Post } from "../../models/Post";
import { Paginator } from "../../components/Paginator";
import { useParams } from "react-router-dom";
import { PostContainer } from "../../components/PostContainer";

export const Posts = () => {
  const [posts, setPosts] = useState([]);

  // Pagination
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);

  // thread id
  let id: any = useParams();
  let threadId:any = parseInt(id.id);

  useEffect(() => {
    (
      async () => {
        let postData = null;

        if (isNaN(threadId)) {
          postData = await axios.get(`posts?page=${page}`)
        } else {
          postData = await axios.get(`posts/threads/${threadId}?page=${page}`)
        }

        setPosts(postData.data.data)
        setLastPage(postData.data.meta.last_page)
      }
    )()
  }, [page, threadId]);

  return (
    <Wrapper>
      <div className="main-post-container"> 
        {posts.map((post: Post) => {
         return (
          <PostContainer post={post} thread={post.thread} user={post.user} setPosts={setPosts} posts={posts}/>
         )
        })}
      </div>
      
      {/* Pagination */}
      <div className="bottom-bar">
        <Paginator page={page} lastPage={lastPage} pageChanged={setPage}/>
      </div>
    </Wrapper>
  )
}
