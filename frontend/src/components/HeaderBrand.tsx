import './Header.scss';
import React, { FunctionComponent, ReactNode, useState } from 'react';

interface Props {
  icon?: JSX.Element;
  title?: string;
  url: string;
  children?: ReactNode;
}

export const HeaderBrand: FunctionComponent<Props> = ({icon, title, url, children}) => {

  return (
    <li className="header-container">
      <a href={url} className="header-brand">
          {icon}{title}
      </a>
    </li>
  );
}