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

// {/* <nav className="navbar">
//       <Link className="nav-brand" to="/">Photo-webapp</Link>
//       <ul className="nav-list">  
//         <li className="nav-item">
//           <Link to="/threads">Threads</Link>
//         </li> 
//         <li className="nav-item">
//         </li>
//         <li className="nav-item">
//           <Link to="/users">Users</Link>
//         </li> 
//         <li className="nav-item">
//           <Link to="/profile">{user.user_name}</Link>
//         </li> 
//         <li className="nav-item">
//           <Link to="/login" onClick={logout}>Sign out</Link>
//         </li> 
//       </ul> 
//     </nav> */}

