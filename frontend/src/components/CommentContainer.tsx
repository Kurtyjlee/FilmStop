import "./../styles/PostContainer.scss";
import "./../styles/PostCreate.scss";

import { User } from "../models/User";
import { useForm } from "../customHooks/useForm";
import { FunctionComponent, useEffect, useState } from "react";
import axios from "axios";
import { Post } from "../models/Post";
import { Thread } from "../models/Thread";

interface Props {
  commentDesc?: string;
  commentLikes?: number;
  commentUser?: number;
}

export const CommentContainer:FunctionComponent<Props> = ({commentDesc, commentLikes, commentUser}) => {

  const [username, setUsername] = useState("")
  const [userId, setUserId] = useState(0);

  useEffect(() => {
    (
      async () => {
        const {data} = await axios.get(`users/${commentUser}`);

        setUsername(data.user_name);
        setUserId(data.id);

      }
    )();
  }, [])

  return (
    <div className="make-comment-container">
      <p className="label" >{username}</p>
      <p className="label">{commentDesc}</p>
      <hr />
      <p className="label">Likes: {commentLikes}</p>
    </div>
  )
}