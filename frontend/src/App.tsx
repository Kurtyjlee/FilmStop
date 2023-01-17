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
import { PostEdit } from './pages/posts/PostEdit';
import Profile from './pages/Profile';
import { CommentCreate } from './pages/comments/CommentCreate';

// Main app
function App() {
  return (
    <div className='app'>
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<Home/>} />
          <Route path={'/register'} element={<Register/>} />
          <Route path={'/login'} element={<Login/>} />
          <Route path={'/profile'} element={<Profile/>} />

          {/* users */}
          <Route path={'/users'} element={<Users/>} />
          <Route path={'/users/create'} element={<UserCreate/>} />
          <Route path={'/users/:id/edit'} element={<UserEdit/>} />
          
          {/* Create posts */}
          <Route path={'/posts'} element={<Posts/>} />
          <Route path={'/posts/create'} element={<PostCreate/>} />
          <Route path={'/posts/:id/edit'} element={<PostEdit/>} />

          {/* Create comments */}
          <Route path={'/posts/:id/comment_create'} element={<CommentCreate/>} />
        </Routes>
      </BrowserRouter>
    </div>
    
  );
}

export default App;
