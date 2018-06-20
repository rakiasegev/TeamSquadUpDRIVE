import React from 'react';
import { render } from 'react-dom';
import App from './App';
import {YelpAPI} from './api';  
import {weatherapi} from './weatherapi'; 
import {login} from './login'; 
import { Router, browserHistory, Route, Link } from 'react-router';

render((
  <Router history={browserHistory}>
    <Route exact path="/" component={App}/>
    <Route exact path="/login" component ={login}/>
    <Route exact path="/api" component={YelpAPI}/>
    <Route exact path="/weatherapi" component={weatherapi}/>
  </Router>
), document.getElementById('root'))