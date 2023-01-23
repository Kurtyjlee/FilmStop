import "./PostContainer.scss";

import { FunctionComponent, ReactNode } from "react";
import { Post } from "../models/Post";
import { Thread } from "../models/Thread";
import { Link } from "react-router-dom";
import { User } from "../models/User";

interface Props {
  post: Post;
  thread: Thread;
  user: User;
  children?: ReactNode;
}

export const PostContainer: FunctionComponent<Props> = ({post, thread, user, children}) => {
  return (
    <div className="inner-post-container">
      <div className="title-container">
        <h3>{post.title}</h3>
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
        <span className="label">Likes: {post.total_likes}</span> 
        <span>""</span> 
        <span className="label">Comments: {post.total_comments}</span> 
      </div>
      <div className="desc-container">
        <p>{post.description}</p>
      </div>
    </div>
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
