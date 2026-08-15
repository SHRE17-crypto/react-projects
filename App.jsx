import { useState } from 'react'

import './App.css'

function App() {
 
  const [todos, setTodos] = useState([])
  const [inputValue, setInputValue] = useState('')

  function addTodo() {
    if (inputValue.trim() !== '') {
      setTodos([...todos, { id: Date.now(), text: inputValue.trim(), completed: false }])
      setInputValue('')

    }
  }

  function deleteTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id))
  }
  function toggleTodo(id) {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }
  function deleteAllTodos() {
    setTodos([])
  }

  return (
    <>
      <h1>To-Do App</h1>
      {/* <h1>{count}</h1>
    <button onClick={() => setCount(count + 1)}>Add</button> */}
      <input id="input"
        type="text" 
        placeholder="Add a new task" 
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button className="add-button"
        onClick={addTodo}
      >Add Task</button>
      <div className="todo-btns">
        {todos.map((todo) => (
          <li className="todo-item" key={todo.id}>
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.text}
            </span>
            <div>
              <button id="delete" onClick={() => deleteTodo(todo.id)}>
                Delete
              </button>
              <button id='toggle' onClick={() => toggleTodo(todo.id)}>
                {todo.completed ? 'Undo' : 'Complete'}
              </button>
            </div>
          </li>
        ))}
        <button className="add-button" onClick={deleteAllTodos}>Delete All Tasks</button>
        </div>
       
    </>

      
    
  )
}

export default App
