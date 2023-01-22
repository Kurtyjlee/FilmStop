// svg
import { ReactComponent as BellIcon } from './../icons/bell.svg'
import { ReactComponent as ArrowIcon } from './../icons/arrow.svg'
import { ReactComponent as BoltIcon } from './../icons/bolt.svg'
import { ReactComponent as CaretIcon } from './../icons/caret.svg'
import { ReactComponent as MessengerIcon } from './../icons/messenger.svg'
import { ReactComponent as PlusIcon } from './../icons/plus.svg'

import React from "react";
import { Header } from "./Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { HeaderItem } from "./HeaderItem";
import { DropdownMenu } from "./DropdownMenu";
import { HeaderBrand } from './HeaderBrand'
import { SearchBar } from './SearchBar'
import { IconContainer } from './IconContainer'

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
      <Header>
        <HeaderBrand title="FilmStop" url="/"/>
        <SearchBar />
        <IconContainer>
          <HeaderItem icon={<PlusIcon/>} url="/posts/create" />
          <HeaderItem icon={<BellIcon/>} url="#!" />
          <HeaderItem icon={<MessengerIcon/>} url="#!" />
          <HeaderItem icon={<CaretIcon/>} url="#!">
            <DropdownMenu />
          </HeaderItem>
        </IconContainer>
      </Header>
      {props.children}
    </>
  )
}
