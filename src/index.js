import React from 'react';
import { render } from 'react-dom';
import App from './App';
<<<<<<< HEAD
import {YelpAPI} from './api';  
import {weatherapi} from './weatherapi'; 
import {login} from './login'; 
=======
import {weatherapi} from './weatherapi'; 
import {Cards} from './Cards';
import {SwiperNoSwiping} from './SwiperNoSwiping'
>>>>>>> 0cf3f00af09986f5c58df15c4993d3bcd56948ed
import { Router, browserHistory, Route, Link } from 'react-router';

render((
  <Router history={browserHistory}>
    <Route exact path="/" component={App}/>
<<<<<<< HEAD
    <Route exact path="/login" component ={login}/>
    <Route exact path="/api" component={YelpAPI}/>
=======
    <Route exact path="/login"/>
>>>>>>> 0cf3f00af09986f5c58df15c4993d3bcd56948ed
    <Route exact path="/weatherapi" component={weatherapi}/>
    <Route exact path="/SwiperNoSwiping" component= {SwiperNoSwiping} />
  </Router>
), document.getElementById('root'))

