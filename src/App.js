import React, { useState, useRef, useEffect } from 'react';
import Todolist from './Todolist';
import {v4} from 'uuid';
// import mongoose from 'mongoose';

// mongoose.connect('mongodb://localhost/new_DB_React', { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(console.log('DB connected successfully'))
//   .catch(err => console.log(err));

const LOCAL_STORAGE_KEY = 'todoApp.todos';
function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos]);

  function toggleTodo(id) {
    const newTodos = [...todos];
    const todo = newTodos.find(todo => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value;
    if(name === '') return;
    setTodos(prevTodos => {
      return [...prevTodos, { id: v4(), name: name, complete: false }]
    })
    todoNameRef.current.value = null;   
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete);
    setTodos(newTodos);
  }

  return (
    <React.Fragment>
      <Todolist todos={todos} toggleTodo={toggleTodo}/>
      <input ref={todoNameRef} type='text'/>
      <button onClick={handleAddTodo}>Add Todo</button>
      <button onClick={handleClearTodos}>Clear Complete</button>
      <div>{todos.filter(todo => !todo.complete).length} left to do</div>
    </React.Fragment>
  );
}

export default App;
