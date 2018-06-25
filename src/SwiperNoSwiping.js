import React, { Component } from 'react';
import { Router, browserHistory, Route, Link } from 'react-router';
import {API} from './api'
import {Cards} from './Cards'
export class SwiperNoSwiping extends Component {
  constructor(props) { 
    super(props) 
    this.state={ 
         results: null
    }
  }
  getData(recieveResults) { 
      this.setState({
        results: recieveResults
      })
  }
  render() { 
    var out = null
    if(this.state.results==null){
    return (<API sendData= {this.getData.bind(this)} /> )
    }
    else {
   return (<Cards results={this.state.results}/> )}
    console.log(out)
    }}


export default SwiperNoSwiping;