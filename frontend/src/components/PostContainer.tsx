import "./../styles/PostContainer.scss";
import { ReactComponent as TripleDotIcon } from './../icons/triple-dots.svg'

import { FunctionComponent, ReactNode, useEffect, useState } from "react";
import { Post } from "../models/Post";
import { Thread } from "../models/Thread";
import { Link } from "react-router-dom";
import { User } from "../models/User";
import axios from "axios";
import { HeaderItem } from "./HeaderItem";

interface Props {
  post: Post;
  thread: Thread;
  user: User;
  children?: ReactNode;
  setPosts?: (post: any) => void 
  posts?: Array<number>
}

export const PostContainer: FunctionComponent<Props> = ({post, thread, user, children, setPosts, posts}) => {

  const [userId, setUserId] = useState(0);

  useEffect(() => {
    (
      async () => {
        const {data} = await axios.get("user");

        setUserId(data.id);
        console.log("userid: " + userId);
        console.log("postuserid: " + post.user_id);
      }
    )()
  }, []);

  const del = async (id: number) => {
    if (window.confirm("Confirm Delete?")) {
      await axios.delete(`posts/${id}`);
      if (setPosts && posts) {
        setPosts(posts.filter((p: any) => p.id !== id));
      }
    }
  }

  return (
    <Link className="inner-post-container" to={`/posts/${post.id}`}>
      <div className="title-container">
        <div className="top-container">
          <h3>{post.title}</h3>
          <HeaderItem className="options" icon={<TripleDotIcon/>}>
            <div className="small-dropdown" >
              {
                userId == post.user_id
                  ? (<>
                      <Link to={`/posts/${post.id}/edit`}>Edit</Link>
                      <a onClick={() => del(post.id)}>Delete</a>
                    </>)
                  : <span className="label">No actions to be made...</span>
              }
              
            </div>
          </HeaderItem>
        </div>
        <div className="thread-container">
          <span className="label">Thread: </span>
          <Link to={`/posts/threads/${thread.id}`}>{thread.name}</Link>
        </div>
        <div className="thread-container">
          <span className="label">Posted by: </span>
          <Link to="#!">{user.user_name}</Link>
        </div>
      </div>
      <div className="image-container">
        <img src={post.image} width="50"/>
      </div>
      <div className="likes-container">
        <p className="label-likes">Likes: {post.total_likes}</p> 
        <p className="label-likes">Comments: {post.total_comments}</p> 
      </div>
      <div className="desc-container">
        <p>{post.description}</p>
      </div>
    </Link>
  );
}
