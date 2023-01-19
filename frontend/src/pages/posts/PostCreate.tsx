import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
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
    return <Navigate to={"/posts"} />
  }

  return (
    <Wrapper>
      <h3>create post</h3>
      <main className="form-register">
        <form onSubmit={handleSubmit}>
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
            <input 
              className="form-input" 
              placeholder="Image" 
              name="image"
              value={image}
              required 
              onChange={e => setImage(e.target.value)}
            />
            <ImageUpload uploaded={setImage}/>
          </div>

          <select
            className="form-input" 
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
          

          {/* Like feature have to be coded */}

          <button type="submit">Create</button>

        </form>
      </main>
    </Wrapper>
  );
}