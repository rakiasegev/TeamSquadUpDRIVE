import React, { Component } from 'react';
import * as firebase from 'firebase';
var config = {
  apiKey: "AIzaSyCor4vAkog6uforo0X1fYRQmpSc1eXSH0I",
  authDomain: "swiperrrrrr.firebaseapp.com",
  databaseURL: "https://swiperrrrrr.firebaseio.com",
  storageBucket: "swiperrrrrr.appspot.com",
};

export class DisplayResults extends Component{ 
    constructor(props){
        super(props) 
        this.state= { 
            resultsRef: firebase.database().ref('Results'),
            inital: true
        }
    }

    getLargest() { 
        this.setState({
            inital: false 
        })
        console.log(this.state.resultsRef)
        var largestLikeIndex= 0
        var largerstLikeNum= 0 

    } 
    render(){ 
        if(this.state.inital){
            this.getLargest() }
        return (
            <div>

            Results! 
            </div>  
        ) 
    }  
}
export default DisplayResults
