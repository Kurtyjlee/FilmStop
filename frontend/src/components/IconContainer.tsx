import './../styles/Header.scss';

import { PropsWithChildren } from 'react';

// Custom header component
export const IconContainer = (props: PropsWithChildren) => {

  return (
    <ul className="navbar-nav">
      {props.children}
    </ul>
  )
}
