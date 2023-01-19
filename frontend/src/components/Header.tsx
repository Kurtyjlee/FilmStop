// For learning- this imports the scss file
import './Header.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { User } from '../models/User';
import { Link } from 'react-router-dom';

// Custom header component
export const Header = () => {

  const [user, setUser] = useState(new User());

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
      }
    )();
  }, []);

  const logout = async () => {
    // Send empty data in the post request
    await axios.post('logout', {});
  }

  return (
    <nav className="navbar">
      <Link className="nav-brand" to="/">Photo-webapp</Link>

      <ul className="nav-list">  
        <li className="nav-item">
          <Link to="/threads">User posts</Link>
        </li> 
        <li className="nav-item">
          <Link to="/threads">Threads</Link>
        </li> 
        <li className="nav-item">
          <Link to="/posts">Posts</Link>
        </li> 
        <li className="nav-item">
          <Link to="/users">Users</Link>
        </li> 
        <li className="nav-item">
          <Link to="/profile">{user.user_name}</Link>
        </li> 
        <li className="nav-item">
          <Link to="/login" onClick={logout}>Sign out</Link>
        </li> 
      </ul> 
    </nav>
  )
}