import React from 'react';
import './App.css';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { Users } from './pages/Users';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { UserCreate } from './pages/UserCreate';
import { UserEdit } from './pages/UserEdit';
import { Posts } from './pages/posts/Posts';
import { PostCreate } from './pages/posts/PostCreate';

// Main app
function App() {
  return (
    <div className='app'>
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<Home/>} />
          <Route path={'/register'} element={<Register/>} />
          <Route path={'/login'} element={<Login/>} />
          <Route path={'/users'} element={<Users/>} />
          <Route path={'/users/create'} element={<UserCreate/>} />
          <Route path={'/users/:id/edit'} element={<UserEdit/>} />
          <Route path={'/posts'} element={<Posts/>} />
          <Route path={'/posts/create'} element={<PostCreate/>} />
        </Routes>
      </BrowserRouter>
    </div>
    
  );
}

export default App;
