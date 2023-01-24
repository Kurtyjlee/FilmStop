import "./PostContainer.scss";
import { ReactComponent as TripleDotIcon } from './../icons/triple-dots.svg'

import { FunctionComponent, ReactNode, useEffect, useState } from "react";
import { Post } from "../models/Post";
import { Thread } from "../models/Thread";
import { Link, Navigate } from "react-router-dom";
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
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    (
      async () => {
        const {data} = await axios.get("user");

        setUserId(data);
        console.log(userId);
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

  const directDetails = () => {
    return (<Navigate to={`/posts/${post.id}/comment_create`} />);
  }

  return (
    <Link className="inner-post-container" to={`/posts/${post.id}/comment_create`}>
      <div className="title-container">
        <div className="top-container">
          <h3>{post.title}</h3>
          <HeaderItem className="options" icon={<TripleDotIcon/>}>
            <div className="small-dropdown" >
              {
                userId === post.user_id 
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

//  <tr key={post.id}>
  //   <td>{post.id}</td>
  //   <td><img src={post.image} width="50"/></td>
  //   <td>{post.title}</td>
  //   <td>{post.description}</td>
  //   <td>{post.total_likes}</td>
  //   <td>{post.thread_id}</td>
  //   {/* Actions */}
  //   <td>
  //     <div className="btn-group mr-3">
  //       <Link 
  //         className="btn btn-sm btn-outline-secondary text-white"
  //         to={`/posts/${post.id}/edit`}
  //       >Edit</Link>
  //       <a 
  //         className="btn btn-sm btn-outline-secondary text-white"
  //         href="#!"
  //         onClick={() => del(post.id)}
  //       >Delete</a>
  //       <a 
  //         className="btn btn-sm btn-outline-secondary text-white"
  //         href="#!"
  //         onClick={() => select(post.id)}
  //       >View</a>
  //       <Link 
  //       className="btn btn-sm btn-outline-secondary text-white"
  //         to={`/posts/${post.id}/comment_create`}
  //       >Comment</Link>
  //     </div>
  //   </td>
  // </tr>
  // {/* comments */}
  // <tr>
  //   <td colSpan={10}>
  //     <div className="overflow-hidden" style={selected === post.id ? show : hide}>
  //       <table className="table table-sm text-white">
  //         <thead>
  //           <tr>
  //             <th>#</th>
  //             <th>description</th>
  //             <th>likes</th>
  //           </tr>
  //         </thead>
  //         <tbody>
  //         {post.comments.map((comment: Comments) => {
  //           return (
  //             <tr>
  //               <td>{comment.id}</td>
  //               <td>{comment.description}</td>
  //               <td>{comment.total_likes}</td>
  //             </tr>
