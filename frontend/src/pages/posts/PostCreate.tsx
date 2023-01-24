import './../../styles/PostCreate.scss'

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { ImageUpload } from "../../components/ImageUpload";
import { Wrapper } from "../../components/Wrapper";
import { useForm } from "../../customHooks/useForm";
import { Thread } from "../../models/Thread";

// make it either get threadId from url or user manually input thread

export const PostCreate = () => {
  const [redirect, setRedirect] = useState(false);
  const [image, setImage] = useState("");
  const [threads, setThreads] = useState([]);

  // All fields blank
  const initialState = {
    title: "",
    description: "",
    image: "",
    total_likes: 0,
    total_comments: 0,
    user_id: 2,
    thread_id: 1,
  };

  useEffect(() => {
    (
      async () => {
        const {data} = await axios.get("threads");

        setThreads(data.data);   
      }
    )();
  }, [])

  async function createPostCallback(values: any) {
    await axios.post("posts", {
      title: values.title,
      description: values.description,
      image: image,
      total_likes: values.likes,
      total_comments: values.comments,
      user_id: values.user_id,
      thread_id: +values.thread_id
    })

    setRedirect(true);
  }

  const { handleInputChange, handleSubmit } = useForm(
    createPostCallback,
    initialState
  );

  if (redirect) {
    return <Navigate to={"/"} />
  }

  return (
    <Wrapper>
      <div className='create-post-container'>
        <form className="main-container" onSubmit={handleSubmit}>
          <h3 className="post-label">Create a post</h3>
          <hr></hr>
          <select
            className="form-dropdown" 
            name="thread_id"
            required
            onChange={handleInputChange}
          >
            {threads.map((t: Thread) => {
              return (
                <option key={t.id} value={t.id}>{t.name}</option>
              );
            })}
          </select>
          <input 
            className="form-input" 
            placeholder="Title"
            name="title"  
            required 
            onChange={handleInputChange}
          />

          <textarea
            className="form-input" 
            placeholder="Description"
            name="description"   
            required 
            onChange={handleInputChange}
          />

          <div className="input-group">
            <ImageUpload uploaded={setImage} value={image}/>
          </div>          

          {/* Like feature have to be coded */}
          
          <div className="button-container">
            <button className="action-button-dark" onClick={() => {setRedirect(true)}}>Cancel</button>
            <button className="action-button-white" type="submit">Post</button>
          </div>
        </form>
      </div>
      
    </Wrapper>
  );
}