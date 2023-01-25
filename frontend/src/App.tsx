import React from 'react';
import './App.css';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { Users } from './pages/users/Users';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { UserCreate } from './pages/users/UserCreate';
import { UserEdit } from './pages/users/UserEdit';
import { Posts } from './pages/posts/Posts';
import { PostCreate } from './pages/posts/PostCreate';
import { PostEdit } from './pages/posts/PostEdit';
import Profile from './pages/Settings';
import { PostDetails } from './pages/posts/PostDetails';
import { Threads } from './pages/threads/Threads';

// Main app
function App() {
  return (
    <div className='app'>
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<Posts/>}/>
          <Route path={'/register'} element={<Register/>} />
          <Route path={'/login'} element={<Login/>} />
          <Route path={'/settings'} element={<Profile/>} />

          {/* users */}
          <Route path={'/users'} element={<Users/>} />
          <Route path={'/users/create'} element={<UserCreate/>} />
          <Route path={'/users/:id/edit'} element={<UserEdit/>} />
          
          {/* Create posts */}
          <Route path={'/posts/create'} element={<PostCreate/>} />
          <Route path={'/posts/:id/edit'} element={<PostEdit/>} />
          <Route path={'/posts/threads/:id/'} element={<Posts/>} />

          {/* Create comments */}
          <Route path={'/posts/:id'} element={<PostDetails/>} />

          {/* threads */}
          <Route path={'/threads'} element={<Threads/>} />
          
        </Routes>
      </BrowserRouter>
    </div>
    
  );
}

export default App;
