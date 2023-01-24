import "./../styles/ImageUpload.scss";

import axios from "axios";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

export const ImageUpload = (props: {uploaded: (url: string) => void, value: string}) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles: any) => {
    setFiles(acceptedFiles);
    setLoading(true);
    upload(acceptedFiles)
     .finally(() => setLoading(false));
    console.log(acceptedFiles);
  },[]);

  const {getRootProps, getInputProps, isDragAccept, isDragReject} = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': []
    }
  });  

  const upload = async (files: FileList | null) => {
    if (files === null) return;

    // Image can only be parsed via FormData
    const formData = new FormData();
    formData.append("image", files[0]);

    const {data} = await axios.post("uploads/image", formData);

    props.uploaded(data.url);

    return {data};
  }

  return (
    <div {...getRootProps()} className="dropzone-container">
      <input {...getInputProps()}/>
      <div className="inner-dropzone-container">
        {
          props.value ? (
            <img src={props.value} />
          ) : loading ? (<span>loading...</span>) : isDragReject 
          ? <p className="label">Only png and jpeg accepted!</p> 
          : <p className="label">Drag & drop files here, or click to select files</p>
        }
      </div>
    </div>
  );
}

// <label>
//  Upload 
// <input 
//   type="file" 
//   hidden 
//   onChange={e => upload(e.target.files)} /> 
// </label>
