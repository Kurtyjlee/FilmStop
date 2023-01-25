import './../styles/Header.scss';

import axios from 'axios';
import { PropsWithChildren, useEffect, useState } from 'react';
import { User } from '../models/User';
// import { Link } from 'react-router-dom';
// import { Thread } from '../models/Thread';

// Custom header component
export const Header = (props: PropsWithChildren) => {

  const [user, setUser] = useState(new User());
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    // To get an async function
    (
      async () => {
        const {data} = await axios.get("user");
        
        setUser(new User(
          data.id,
          data.user_name,
          data.email,
          data.role,
        ));

        const threadData = await axios.get(`threads`)

        setThreads(threadData.data.data);
      }
    )();
  }, []);

  const logout = async () => {
    // Send empty data in the post request
    await axios.post('logout', {});
  }

  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        {props.children}
      </ul>
    </nav>
  )
}
