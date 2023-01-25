import './../../styles/PostCreate.scss'

import axios from "axios";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { Wrapper } from "../../components/Wrapper";
import { Thread } from '../../models/Thread';
import { ImageUpload } from '../../components/ImageUpload';

export const PostEdit = () => {
  const [redirect, setRedirect] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [threads, setThreads] = useState([]);
  const [threadId, setThreadId] = useState(0);

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

        const threadData = await axios.get("threads");

        setThreads(threadData.data.data);   
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
      "thread_id": threadId,
    });

    setRedirect(true);
  }

  if (redirect) {
    return <Navigate to={"/"} />
  }

  return (
    <Wrapper>
      <div className='create-post-container'>
        <form onSubmit={submit}>
          <h3 className="post-label">Edit</h3>
          <hr />
          <select
            className="form-dropdown" 
            name="thread_id"
            required
            onChange={(e) => setThreadId(+e.target.value)}
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

          <div className="input-group">
            <ImageUpload uploaded={setImage} value={image}/>
          </div>  

          <div className="button-container">
            <button className="action-button-dark" onClick={() => {setRedirect(true)}}>Cancel</button>
            <button className="action-button-white" type="submit">Change</button>
          </div>

        </form>
      </div>
      
    </Wrapper>
  );
}
