import React from 'react';
import TaskList from './components/TaskList';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="container">
        <h1>My Todo List</h1>
        <TaskList />
      </div>
    </div>
  );
}

export default App;
