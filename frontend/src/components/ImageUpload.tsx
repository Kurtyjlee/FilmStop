import axios from "axios";
import React from "react";

export const ImageUpload = (props: {uploaded: (url: string) => void}) => {

  const upload = async (files: FileList | null) => {
    if (files === null) return;

    // Image can only be parsed via FormData
    const formData = new FormData();
    formData.append("image", files[0]);

    const {data} = await axios.post("uploads/image", formData);

    console.log(data);
    console.log(data.url);
    props.uploaded(data.url);

  } 

  return (
    <label>
      Upload 
      <input 
        type="file" 
        hidden 
        onChange={e => upload(e.target.files)} /> 
    </label>
  );
}
