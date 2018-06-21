import React from 'react';
import { render } from 'react-dom';
import App from './App';
import {API} from './api';  
import {weatherapi} from './weatherapi';  
import {Cards} from './Cards'
import { Router, browserHistory, Route, Link } from 'react-router';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';

render((
  <Router history={browserHistory}>
    <Route exact path="/" component={App}/>
    <Route exact path="/api" component={API}/>
    <Route exact path="/weatherapi" component={weatherapi}/>
    <Route exact path="/cards" component= {Cards}/> 
  </Router>
), document.getElementById('root'))