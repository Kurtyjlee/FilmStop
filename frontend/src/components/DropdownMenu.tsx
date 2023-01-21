// svg
import { ReactComponent as CogIcon } from './../icons/cog.svg'
import { ReactComponent as ChevronIcon } from './../icons/chevron.svg'

// Style
import './DropdownMenu.scss';

import { FunctionComponent, JSXElementConstructor, PropsWithChildren, ReactNode } from "react";

interface Props {
  url: string;
  children?: ReactNode;
  lefticon? : JSX.Element
  righticon? : JSX.Element
}

export const DropdownMenu = () => {

  const DropdownItem: FunctionComponent<Props> = ({url, children, lefticon, righticon}) => {
    return (
      <a href={url} className="menu-item">
        <span className="icon-button">{lefticon}</span>

        {children}
        
        <span className="icon-right">{righticon}</span>
      </a>
    );
  }

  return (
    <div className="dropdown">
      <DropdownItem url="#!">My profile</DropdownItem>
      <DropdownItem url="#!" lefticon={<CogIcon/>} righticon={<ChevronIcon/>}>
        Settings
      </DropdownItem>
    </div>
  )
}
