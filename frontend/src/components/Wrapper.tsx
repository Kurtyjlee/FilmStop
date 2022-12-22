import React from "react";
import { Header } from "./Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

export const Wrapper = (props: any) => {

  const [redirect, setRedirect] = useState(false);

  // Ensure user has logged in
  useEffect(() => {
    (
      async () => {
        try {
          await axios.get("user");
        } catch (e) {
          setRedirect(true);
        }
      }
    )();
  }, []);

  // If user has not logged in
  if (redirect) {
    return <Navigate to="/login" />;
  }

  // Main header
  return (
    <>
      <div>
        <Header/>
      </div>
      {props.children}
    </>
  )
}
