import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/layout/Header';
import Todos from './components/Todos';
import AddTodo from './components/AddTodo';
import About from './components/pages/About';
// import { v4 as uuidv4 } from 'uuid';

import './App.css';

class App extends Component {
  state = {
    todos: []
  }

  componentDidMount() {
    // Fetch Todos
    const fetchTodos = async () => {
      const res = await fetch('http://localhost:5000/todos');
      const data = await res.json();
      this.setState({ todos: data });
    }

    fetchTodos();
  }

  // Toggle Complete
  markComplete = id => {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      })
    });
  };

  // Delete Todo
  delTodo = async id => {
    const res = await fetch(`http://localhost:5000/todos/${id}`, {
      method: 'DELETE'
    });
    //We should control the response status to decide if we will change the state or not.
    res.status === 200
      ? this.setState({
          todos: this.state.todos.filter((todo) => todo.id !== id)
      })
      : alert('Error Deleting This Task');
  };

  // Add Todo
  addTodo  = async (title) => {
    const newTodo = {
      title,
      completed: false
    };

    const res = await fetch('http://localhost:5000/todos', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(newTodo)
    });

    const data = await res.json();
    
    this.setState({
      todos: [...this.state.todos, data]
    });
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className='container'>
            <Header />
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <AddTodo addTodo={this.addTodo} />
                    <Todos
                      todos={this.state.todos}
                      markComplete={this.markComplete}
                      delTodo={this.delTodo}
                    />
                  </>
                }
              />
              <Route path="/about" element={<About />} />
            </Routes>     
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
