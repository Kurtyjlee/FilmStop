import axios from "axios";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { ImageUpload } from "../../components/ImageUpload";
import { Wrapper } from "../../components/Wrapper";
import { useForm } from "../../customHooks/useForm";

export const PostCreate = () => {
  const [redirect, setRedirect] = useState(false);
  const [image, setImage] = useState("");

  // All fields blank
  const initialState = {
    title: "",
    description: "",
    image: "",
    likes: 0
  };

  async function createPostCallback(values: any) {
    await axios.post("posts", {
      title: values.title,
      description: values.description,
      image: image,
      likes: values.likes
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
          

          {/* Like feature have to be coded */}

          <button type="submit">Create</button>

        </form>
      </main>
    </Wrapper>
  );
}