import "./../styles/PostContainer.scss";
import "./../styles/PostCreate.scss";

import { User } from "../models/User";
import { FunctionComponent, SyntheticEvent, useState } from "react";
import axios from "axios";
import { Comments } from "../models/comments";

interface Props {
  postId?: number;
  user: User;
  setComments: ([]: any) => void;
  comments: Array<Comments>;
}

export const MakeCommentContainer:FunctionComponent<Props> = ({postId, user, setComments, comments}) => {

  const [description, setDescription] = useState("")

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    await axios.post(`comments`, {
      "description": description,
      "total_likes": 0,
      "post_id": postId,
      "user_id": user.id
    });

    setComments([new Comments(
      0,
      description,
      0,
      user.id,
    ), ...comments])
  }

  return (
    <div className="make-comment-container">
      <form onSubmit={submit}>
        <textarea
          className="form-input-no-margin" 
          placeholder="Description"
          name="description"   
          required 
          onChange={(e) => setDescription(e.target.value)}
        />
        {/* Like feature have to be coded */}

        <div className="comment-footer">
          <button className="action-button-white" type="submit">Comment</button>
        </div>
      </form>
    </div>
  )
}
