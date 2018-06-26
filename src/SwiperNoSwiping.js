// This file brings everything together by calling API and Cards
import React, { Component } from 'react';
import { Router, browserHistory, Route, Link } from 'react-router';
import {API} from './api'
import {Cards} from './Cards'
import {DisplayResults} from './displayResults'
export class SwiperNoSwiping extends Component {
  
  constructor(props) { 
    super(props) 
    this.state={ 
         results: null,
         readyDisplayResults: false 
    }
  }

  getData(recieveResults) { 
  // This function has to be passed to API to get back the results of the API call
      this.setState({
        results: recieveResults
      })
  }

  display() {
    this.setState({
      readyDisplayResults: true
    })
  }


  render() { 
    var out = null
    if(this.state.results==null){
      // As long as no results are loaded, it will keep displaying the location page
      return (<API sendData= {this.getData.bind(this)} /> )
    }
    else {
      if(this.state.readyDisplayResults==false){
      // Once results are loaded, the cards are loaded
      return (<Cards results={this.state.results} DisplayResults={this.display.bind(this)}/> )
      }
      else {
        return (<DisplayResults results={this.state.results}/>)
      }
    }}}
export default SwiperNoSwiping;