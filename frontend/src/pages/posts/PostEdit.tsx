import axios from "axios";
import React, { SyntheticEvent, useEffect, useRef, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { ImageUpload } from "../../components/ImageUpload";
import { Wrapper } from "../../components/Wrapper";

export const PostEdit = () => {
  const [redirect, setRedirect] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState([]);
  const likes = 0;

  // For the image
  const ref = useRef<HTMLInputElement>(null);

  // user id
  let id: any = useParams();
  let postId:any = parseInt(id.id);

  // Loading data
  useEffect(() => {
    (
      async () => {
        const {data} = await axios.get(`posts/${postId}`);

        setTitle(data.title);
        setDescription(data.description);
        setImage(data.image);
      }
    )();
  }, [postId]);

  // Handle submits
  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    console.log(title, description, image);

    await axios.put(`posts/${postId}`, {
      "title": title,
      "description": description,
      "image": image,
      "likes": likes
    });

    setRedirect(true);
  }

  if (redirect) {
    return <Navigate to={"/"} />
  }

  return (
    <Wrapper>
      <main className="form-register">
        <form onSubmit={submit}>
          <input 
            className="form-input" 
            placeholder="Title"
            name="title"
            defaultValue={title}  
            required 
            onChange={e => setTitle(e.target.value)}
          />

          <textarea
            className="form-input" 
            placeholder="Description"
            name="description"
            defaultValue={description}   
            required 
            onChange={e => setDescription(e.target.value)}
          />
          
          {/* Like feature have to be coded */}

          <button type="submit">Update</button>

        </form>
      </main>
    </Wrapper>
  );
}
