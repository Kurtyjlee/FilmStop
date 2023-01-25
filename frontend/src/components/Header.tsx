import './../styles/Header.scss';

import { PropsWithChildren } from 'react';
// import { Link } from 'react-router-dom';
// import { Thread } from '../models/Thread';

// Custom header component
export const Header = (props: PropsWithChildren) => {

  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        {props.children}
      </ul>
    </nav>
  )
}
