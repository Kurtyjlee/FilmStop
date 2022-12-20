// For learning- this imports the scss file
import './Header.scss';
import { Link } from 'react-router-dom';

// Custom header component
export const Header = () => {
  return (
    // For learning- makes a header with a class name
      <ul className="nav-list">  
        <li className='nav-item'>  
          <Link to="/">Photo Webapp</Link>  
        </li>  
        <li className='nav-item'>   
          <Link to="/users">User</Link>  
        </li>   
        <li className='nav-item'>   
          <Link to="/login">Login</Link>  
        </li> 
        <li className='nav-item'>   
          <Link to="/register">Register</Link>  
        </li> 
    </ul> 
    
    
  )
}