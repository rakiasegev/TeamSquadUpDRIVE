import React from 'react';
import { render } from 'react-dom';
import App from './App';
import {API} from './api';  
import {weatherapi} from './weatherapi'; 
import {login} from './login'; 
import {Cards} from './Cards';
import {SwiperNoSwiping} from './SwiperNoSwiping'
import { Router, browserHistory, Route, Link } from 'react-router';

render((
  <Router history={browserHistory}>
    <Route exact path="/" component={App}/>
    <Route exact path="/login" component ={login}/>
    <Route exact path="/api" component={API}/>
    <Route exact path="/weatherapi" component={weatherapi}/>
    <Route exact path="/cards" component= {Cards}/> 
    <Route exact path="/SwiperNoSwiping" component= {SwiperNoSwiping} />
  </Router>
), document.getElementById('root'))

