// This file brings everything together by calling API and Cards
import React, { Component } from 'react';
import { Router, browserHistory, Route, Link } from 'react-router';
import {API} from './api'
import {Cards} from './Cards'
import {DisplayResults} from './displayResults'
import logo from './logo.png';
import firebase from 'firebase'
export class SwiperNoSwiping extends Component {
  
  constructor(props) { 
    super(props) 
    this.state={ 
         results: null,
         readyDisplayResults: false ,
         groupC: 364759
    }
  }
  getDatafromFirebase() {
    var root= firebase.database().ref(this.state.groupC).child("Results")
    var results = [] 
    var snapshotResults = {}
    var keys = []
    root.once('value',function(snapshot){
         snapshotResults= Object.assign({},snapshot.val(),snapshotResults)
         Object.keys(snapshotResults).map(i=> { 
          var ref= "CmRaAAAAiJXePWe2z4gmIfMTlehvhKrzDWDSLt3qpzNTTb6ePG09O_9McUVlJqbCtwAtEsQShc3XPENqtszlszeFfAm5SlNQMqMpTblxfBHqkF5nOTxpmdrndfWTgeNLrYH3w99nEhCHIJhs2a4Ssv9xlRHz_7BgGhTSCIlnGXCRiDvvqu1PDOfl6_dbKg"
          if(!snapshotResults[i].photoRef==false){
            ref= snapshotResults[i].photoRef
            // Currently only saves the first photo availalbe. 
          }
                results= results.concat({
                    'name': i, 
                    'rating':snapshotResults[i].rating,
                    'photoReference': ref
                })
         })
         
        })
        console.log(results)
        this.setState({
          results: results
        })
      }

  sendGroupCode(groupCode){
      this.setState({
        groupC: groupCode
      })
  }
  getData(recieveResults) { 
  // This function has to be passed to API to get back the results of the API call
      this.getDatafromFirebase()
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
      return (<API sendData= {this.getData.bind(this)} sendGroupCode={this.sendGroupCode.bind(this)} uploadComplete= {this.getDatafromFirebase.bind(this)} /> )
    }
    else {
      if(this.state.readyDisplayResults==false){
      // Once results are loaded, the cards are loaded

      return(<div>
      <img src={logo} className="App-logo2" alt="logo"/> 
      <Cards results={this.state.results} DisplayResults={this.display.bind(this)} groupCode= {this.state.groupC}/> 
      </div>)
      }
      else {
        return (<DisplayResults results={this.state.results} groupCode= {this.state.groupC}/>)
      }
    }}}
export default SwiperNoSwiping;