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
            inital: true,
            mostVoted:"hoch"
        }
    }
    
    getLargest() { 
        this.setState({ 
            inital:false
        })
        var largestLikeIndex= null
        var largerstLikeNum= 0 
        var root= firebase.database().ref(this.props.groupCode)
        var largest = [] 
        var snapshotResults = {}
        var keys = []
        root.child("Results").once('value',function(snapshot){
             snapshotResults= Object.assign({},snapshot.val(),snapshotResults)
             console.log(snapshotResults)
             Object.keys(snapshotResults).map(i=> { 
                if(snapshotResults[i].right>largerstLikeNum){ 
                    largestLikeIndex= i
                    largerstLikeNum= snapshotResults[i].right
                }
             })
             var ref= "CmRaAAAAiJXePWe2z4gmIfMTlehvhKrzDWDSLt3qpzNTTb6ePG09O_9McUVlJqbCtwAtEsQShc3XPENqtszlszeFfAm5SlNQMqMpTblxfBHqkF5nOTxpmdrndfWTgeNLrYH3w99nEhCHIJhs2a4Ssv9xlRHz_7BgGhTSCIlnGXCRiDvvqu1PDOfl6_dbKg"
          if(!snapshotResults[largestLikeIndex].photoRef==false){
            ref= snapshotResults[largestLikeIndex].photoRef
            // Currently only saves the first photo availalbe. 
          }
                largest= {
                    'name': largestLikeIndex, 
                    'rating':snapshotResults[largestLikeIndex].rating,
                    'photoReference': ref
                }
                console.log(largest.name)
                root.child("Most Voted").set(largest.name)   
                
         })     
    } 
    componentDidMount() { 
        console.log("HERE")
        let currentComponent = this;
        var root= firebase.database().ref(this.props.groupCode)
        var out = null
        root.child("Most Voted").once("value",function(snapshot){
            let mostVoted =  snapshot.val()
            console.log(mostVoted)
            currentComponent.setState({
                mostVoted:mostVoted
            })
      
            // console.log(this.state.mostVoted)
  })
    }
    render(){ 
        if(this.state.inital){
            this.getLargest()
    
        }
        return (
            <div>
            <h1>Results! </h1>

            <p>Group Code: {this.props.groupCode}</p>
            <p>Most Right Place: {this.state.mostVoted}</p>
            </div>  
        ) 
    }  
}
export default DisplayResults
