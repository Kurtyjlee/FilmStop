import "./../../styles/PostContainer.scss";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Wrapper } from "../../components/Wrapper";
import { useForm } from "../../customHooks/useForm";
import { PostContainer } from "../../components/PostContainer";
import { User } from "../../models/User";
import { Post } from "../../models/Post";
import { Thread } from "../../models/Thread";
import { MakeCommentContainer } from "../../components/MakeCommentContainer";
import { CommentContainer } from "../../components/CommentContainer";
import { Comments } from "../../models/comments";

export const PostDetails = () => {
  const [user, setUser] = useState(new User());
  const [post, setPost] = useState(new Post(
    0,
    "",
    "",
    "",
    0,
    0,
    0,
    new User(),
    0,
    new Thread(
      0,
      "",
      []
    ),
    []
  ));
  const [comments, setComments] = useState([]);

  // post id
  let id: any = useParams();
  let postId:any = parseInt(id.id);

  useEffect(() => {
    (
      async () => {
        const userData = await axios.get("user")
        const {data} = await axios.get(`posts/${postId}`)

        setUser(userData.data);
        setPost(new Post(
          data.id,
          data.title,
          data.image,
          data.description,
          data.total_likes,
          data.total_comments,
          data.user_id,
          data.user,
          data.thread_id,
          data.thread,
          data.comments
        ));
        setComments(data.comments);
      }
    )();
  }, [])

  return (
    <Wrapper>
      <div className="main-post-container">
        <PostContainer post={post} thread={post.thread} user={post.user} />
      </div>
      <div className="main-post-container">
        <div className="inner-post-container-borderless">
          <MakeCommentContainer postId={postId} user={user} setComments={setComments} comments={comments}/>
          <hr />
          <div className="start-container">
            <h3 className="post-label">Comments</h3>
          </div>
          {comments.map((comment: Comments) => {
            return (
              <CommentContainer commentDesc={comment.description} commentLikes={comment.total_likes} commentUser={comment.user_id}/>
            )
          })}
        </div>
      </div>
    </Wrapper>
  );
}