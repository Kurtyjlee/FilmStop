// svg
import { ReactComponent as CogIcon } from './../icons/cog.svg'

// Style
import './../styles/DropdownMenu.scss';

import { FunctionComponent, JSXElementConstructor, PropsWithChildren, ReactNode } from "react";
import axios from 'axios';

interface Props {
  url: string;
  children?: ReactNode;
  lefticon? : JSX.Element
  righticon? : JSX.Element
  command?: any
}

export const DropdownMenu = () => {

  const logout = async () => {
    // Send empty data in the post request
    await axios.post('logout', {});
  }

  const DropdownItem: FunctionComponent<Props> = ({url, children, lefticon, righticon, command}) => {
    return (
      <a href={url} className="menu-item" onClick={command}>
        <span className="icon-button">{lefticon}</span>

        {children}
        
        <span className="icon-right">{righticon}</span>
      </a>
    );
  }

  return (
    <div className="dropdown">
      <DropdownItem url="/settings" lefticon={<CogIcon/>}>
        Settings
      </DropdownItem>
      <DropdownItem url="/login" command={logout}>
        Logout
      </DropdownItem>
    </div>
  )
}
