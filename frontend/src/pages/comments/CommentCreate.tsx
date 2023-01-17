import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { Wrapper } from "../../components/Wrapper";
import { useForm } from "../../customHooks/useForm";

export const CommentCreate = () => {
  const [redirect, setRedirect] = useState(false);
  const [userId, setUserId] = useState(0);

  // post id
  let id: any = useParams();
  let postId:any = parseInt(id.id);

  // All fields blank
  const initialState = {
    description: "",
    total_likes: 0,
    post_id: postId,
    user_id: userId
  };

  useEffect(() => {
    (
      async () => {
        const {data} = await axios.get("user")

        setUserId(data.id);
      }
    )();
  }, [])

  async function createCommentCallback(values: any) {
    await axios.post("comments", {
      description: values.description,
      total_likes: values.likes,
      post_id: values.post_id,
      user_id: values.user_id
    })

    setRedirect(true);
  }

  const { handleInputChange, handleSubmit } = useForm(
    createCommentCallback,
    initialState
  );

  if (redirect) {
    return <Navigate to={"/Posts"} />
  }

  return (
    <Wrapper>
      <h3>create comment</h3>
      <main className="form-register">
        <form onSubmit={handleSubmit}>
          <textarea
            className="form-input" 
            placeholder="Description"
            name="description"   
            required 
            onChange={handleInputChange}
          />
          {/* Like feature have to be coded */}

          <button type="submit">Create</button>

        </form>
      </main>
    </Wrapper>
  );
}