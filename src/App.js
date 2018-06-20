import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import login from './login';
import { Router, browserHistory, Route, Link } from 'react-router';

class App extends Component {
  constructor() { 
    super() 
    this.state={ 
      title: "HOME"
    }
  }

  render() { 
    return (
  <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>{this.state.title}</h1>
      </div>
      <p className="App-intro">
        This is the {this.state.title} page.
      </p>
      <p>
        <Link to="/">Home</Link>
      </p>
      <p>
        <Link to="/login">Log In</Link>
      </p>
      <p>
        <Link to="/api">Google Maps</Link>
      </p>
      <p>
        <Link to="/weatherapi">Weather</Link>
      </p>
      <p>
        <Link to="/settings">Settings</Link>
      </p>
    </div>
  )}}


export default App;