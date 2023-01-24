// svg
import { ReactComponent as BellIcon } from './../icons/bell.svg'
import { ReactComponent as ArrowIcon } from './../icons/arrow.svg'
import { ReactComponent as BoltIcon } from './../icons/bolt.svg'
import { ReactComponent as CaretIcon } from './../icons/caret.svg'
import { ReactComponent as MessengerIcon } from './../icons/messenger.svg'
import { ReactComponent as PlusIcon } from './../icons/plus.svg'

import "./../styles/Header.scss"

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

  const [loggedIn, setLoggedIn] = useState(true);

  // Ensure user has logged in
  useEffect(() => {
    (
      async () => {
        try {
          await axios.get("user");
        } catch (e) {
          setLoggedIn(false);
        }
      }
    )();
  }, []);

  // Main header
  return (
    <>
      <Header>
        <HeaderBrand title="FilmStop" url="/"/>
        <SearchBar />
        <IconContainer>
          <HeaderItem className="icon-button" icon={<PlusIcon/>} url="/posts/create" />
          <HeaderItem className="icon-button" icon={<CaretIcon/>}>
            <DropdownMenu loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
          </HeaderItem>
        </IconContainer>
      </Header>
      <div className='body-container'>
        {props.children}
      </div>
    </>
  )
}
