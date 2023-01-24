import './../styles/Header.scss';
import React, { FunctionComponent, ReactNode, useState } from 'react';

interface Props {
    icon?: JSX.Element;
    title?: string;
    url?: string;
    children?: ReactNode;
    className?: string
  }

export const HeaderItem: FunctionComponent<Props> = ({icon, title, url, children, className}) => {
  const [open, setOpen] = useState(false);

  return (
    <li className="nav-item">
      <a href={url} className={className} onClick={() => setOpen(!open)}>
          {icon}{title}
      </a>
      {open && children}
    </li>
  );
}

//  onBlur={() => setOpen(false)} //need to fix this
