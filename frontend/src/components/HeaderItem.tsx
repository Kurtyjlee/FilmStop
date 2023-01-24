import './../styles/Header.scss';
import React, { FunctionComponent, ReactNode, useState } from 'react';

interface Props {
    icon?: JSX.Element;
    title?: string;
    url: string;
    children?: ReactNode;
  }

export const HeaderItem: FunctionComponent<Props> = ({icon, title, url, children}) => {
  const [open, setOpen] = useState(false);

  return (
    <li className="nav-item">
      <a href={url} className="icon-button" onClick={() => setOpen(!open)}>
          {icon}{title}
      </a>
      {open && children}
    </li>
  );
}

//  onBlur={() => setOpen(false)} //need to fix this
