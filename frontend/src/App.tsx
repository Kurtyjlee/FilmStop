import React from 'react';
import './App.css';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';

// Main app
function App() {
  return (
    <div className="App">
      <Header/>
      <TodoList todos={[
        {title: "do dishes", description: "Dis is description", isCompleted: true},
        {title: "keep  dishes", isCompleted: true}
      ]} />
    </div>
  );
}

export default App;
