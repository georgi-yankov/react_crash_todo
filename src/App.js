import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/layout/Header';
import Todos from './components/Todos';
import AddTodo from './components/AddTodo';
import About from './components/pages/About';
import { v4 as uuidv4 } from 'uuid';

import './App.css';

class App extends Component {
  state = {
    todos: [
      {
        id: uuidv4(),
        title: 'Take out the trash',
        completed: false
      },
      {
        id: uuidv4(),
        title: 'Dinner with wife',
        completed: false
      },
      {
        id: uuidv4(),
        title: 'Meeting with boss',
        completed: false
      }
    ]
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
  delTodo = id => {
    // axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`).then(res =>
    //   this.setState({
    //     todos: [...this.state.todos.filter(todo => todo.id !== id)]
    //   })
    // );
  };

    // Add Todo
  addTodo = title => {
    const newTodo = {
      id: uuidv4(),
      title,
      completed: false
    }

    this.setState({
      todos: [...this.state.todos, newTodo]
    });


    // axios
    //   .post('https://jsonplaceholder.typicode.com/todos', {
    //     title,
    //     completed: false
    //   })
    //   .then(res => {
    //     res.data.id = uuid.v4();
    //     this.setState({ todos: [...this.state.todos, res.data] });
    //   });
  };

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
