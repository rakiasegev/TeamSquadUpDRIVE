// This file brings everything together by calling API and Cards
import React, { Component } from 'react';
import { Router, browserHistory, Route, Link } from 'react-router';
import {API} from './api';
import {Cards} from './Cards';
import logo from './logo.png';
export class SwiperNoSwiping extends Component {
  
  constructor(props) { 
    super(props) 
    this.state={ 
         results: null
    }
  }

  getData(recieveResults) { 
  // This function has to be passed to API to get back the results of the API call
      this.setState({
        results: recieveResults
      })
  }


  render() {
    var out = null
    if(this.state.results==null){
      // As long as no results are loaded, it will keep displaying the location page
      return (<API sendData= {this.getData.bind(this)} /> )
    }
    else {
      // Once results are loaded, the cards are loaded
      return (
        <div>
      <img src={logo} className="App-logo2" alt="logo"/> 
      <Cards results={this.state.results}/> 
      </div>
    )}
    }}
export default SwiperNoSwiping;