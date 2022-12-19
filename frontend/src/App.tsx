import React from 'react';
import './App.css';
import { Header } from './components/Header';
import { Route, BrowserRouter, Routes, Link } from 'react-router-dom';
import { Home } from './pages/Home';
import { Users } from './pages/Users';

// Main app
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header/>
        <ul className="App-header">  
          <li>  
            <Link to="/">Home</Link>  
          </li>  
          <li>  
            <Link to="/users">User</Link>  
          </li>   
        </ul>  

        <div className='main-component'>
          <Routes>
            <Route path={'/'} element={<Home/>} />
            <Route path={'/users'} element={<Users/>} />
          </Routes>
        </div>
        
      </div>
    </BrowserRouter>
    
  );
}

export default App;
