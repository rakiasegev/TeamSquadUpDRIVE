import React from 'react';
import { render } from 'react-dom';
import App from './App';
import {API} from './api';  
import {weatherapi} from './weatherapi';  
import { Router, browserHistory, Route, Link } from 'react-router';

render((
  <Router history={browserHistory}>
    <Route exact path="/" component={App}/>
    <Route exact path="/api" component={API}/>
    <Route exact path="/weatherapi" component={weatherapi}/>
  </Router>
), document.getElementById('root'))