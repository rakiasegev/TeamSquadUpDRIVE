import React, { Component } from 'react'
import { EHOSTUNREACH } from 'constants';
import "./api.css"
import {Cards} from "./Cards"
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';
import Draggable from 'react-draggable'; // The default
import logo from './logo.png';
import * as firebase from 'firebase';

var config = {
  apiKey: "AIzaSyCor4vAkog6uforo0X1fYRQmpSc1eXSH0I",
  authDomain: "swiperrrrrr.firebaseapp.com",
  databaseURL: "https://swiperrrrrr.firebaseio.com",
  storageBucket: "swiperrrrrr.appspot.com",
};
//firebase.initializeApp(config);


const loginStyles = {
  width: "90%",
  maxWidth: "315px",
  maxHeight: "315px",
  margin: "20px auto",
  borderRadius: "5px",
  padding: "20px",
  background: "white",
  color: "black",
  boxshadow: "10px 10px gray",
}

export class API extends React.Component {
    constructor(props) { 
        super(props) 
        this.state= {
            counter:0 , 
            generatedCard: null,
            value: "",
            latitude: 0,
            longitude:0,
            userRadius:0 ,
            results:[],
            key: "AIzaSyBj5Bbl7_qJu0GpXIEpqvc_xzVBlyMPyKU",
            deltaPosition: {
              x: 0, y: 0
          },
          visibility: "visible"
        }
    }
    grabAPI(location){
        const request = require('request');
        console.log(location)
        request({
          url: 'https://api.foursquare.com/v2/venues/explore',
          method: 'GET',
          qs: {
            client_id: 'TW4TRBBX0YQESQPMU2ET2TBPZBM51NFSA41MVLT0SRCCK23L',
            client_secret: 'SFYZY2HMRMZ04IT2PRONNLCBG0FH5URVOSY22SS40ZU12LXX',
            ll: location,
            query: 'coffee',
            v: '20180323',
            limit: 5
          }
        }, function(err, res, body) {
          if (err) {
            console.error(err);
          } else {
            console.log(body);
          }
        });
    }
    GMapsAPI(location){
      const request = require('request');
      console.log(location)
      request({
        url: 'http://localhost:8080/https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key=' + this.state.key+ '&input='+ this.state.value+'&inputtype=textquery',
      }, function(err, res, body) {
        if (err) {
          console.error(err);
        } else {
          var obj = JSON.parse(body)
          var placeID= obj.candidates[0].place_id
          const quest = require('request');
          quest({
            url: "http://localhost:8080/https://maps.googleapis.com/maps/api/place/details/json?placeid="+placeID+"&key=" + this.state.key+ ""
        }, function(err, res, body) {
          if (err) {
            console.error(err);
          } else {
            const loc = JSON.parse(body)
            this.setState({
              latitude: loc.result.geometry.location.lat,
              longitude: loc.result.geometry.location.lng,})
            this.GMapsNearby()    
          }
        }.bind(this)
      )
      }}.bind(this)
        )}


        GMapsNearby(){
          //using the location in state
          const request = require('request');
          request({
            url: 'http://localhost:8080/https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=' + this.state.key+ '&location='+this.state.latitude+","+ this.state.longitude+'&rankby=distance&type=restaurant'
          },function(err,res,body){
            if(!err){
              var output= []
              const resultsJSON = JSON.parse(body)

              const results= resultsJSON.results
              this.setState({
                results: []
              })
              Object.values(results).forEach(function(result){
                var ref= "CmRaAAAAiJXePWe2z4gmIfMTlehvhKrzDWDSLt3qpzNTTb6ePG09O_9McUVlJqbCtwAtEsQShc3XPENqtszlszeFfAm5SlNQMqMpTblxfBHqkF5nOTxpmdrndfWTgeNLrYH3w99nEhCHIJhs2a4Ssv9xlRHz_7BgGhTSCIlnGXCRiDvvqu1PDOfl6_dbKg"
                if(result.photos!=undefined){
                  ref= result.photos[0].photo_reference
                }
              this.setState({
                results: this.state.results.concat({"name":result.name, "rating":result.rating, "photoReference": ref }),
              })
            this.firebaseResult()
            }.bind(this)
          )
           this.props.sendData(this.state.results)
        }
        }.bind(this)
      )
      }


        getDeviceLocation(){
          //Checking if browser supports Geolocation or not
          if (navigator.geolocation) {
            console.log('Geolocation is supported!');
           navigator.geolocation.getCurrentPosition(this.getLocationSuccess.bind(this), this.getLocationError.bind(this))
          }
          else {
            console.log('Geolocation is not supported for this Browser/OS.');
          }
          }
      
        getLocationSuccess(position){ 
          console.log(position)
        this.setState({ 
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        })
  
        const request = require('request');
        request({
          url: 'http://localhost:8080/https://maps.googleapis.com/maps/api/geocode/json?latlng='+this.state.latitude+","+ this.state.longitude+"&key=" + this.state.key
        }, function(err, res, body) {
          if (err) {
            console.error(err);
          }})
      this.GMapsNearby()
      }
          
      
      getLocationError(){ 
        console.log("NOPE")
        return ("NOPE")
      }

      handleD(e, ui) {
        const {x, y} = this.state.deltaPosition;
        this.setState({
          deltaPosition: {
            x: x + ui.deltaX,
            y: y + ui.deltaY,
          }
        });
        this.completeSwipe() 
      }

      completeSwipe(){
        console.log("MADE IT")
        if(this.state.deltaPosition.x>100){
            this.setState({
                visibility: "hidden"
            })
        }
        else { 
     
        }
    }


    
    handleChangeSubmitLocation(event){ 
        this.setState({value: event.target.value});   
       
        //using 'enter' key
       if (event.keyCode == 13){
        console.log('it works')
        this.setState({value: event.target.value});
      }
      
      }
    
    handleSubmitLocation(event) {
        this.GMapsAPI(this.state.value)
        event.preventDefault();
      }
    handleSubmitRadius(event){ 
      event.preventDefault();
    }
 
    handleChangeRadius(event){ 
      this.setState({userRadius: event.target.value});   
      }
      
    firebaseResult(){ 
      const ResultsRef = firebase.database().ref('Results')
      

      this.state.results.map(i =>{
          var name= this.replaceAll("."," ",i.name)
          console.log(name)
          const result = {
              right: 0,
              left:0
          }
          ResultsRef.child(name).set(result)
          }) 
      }
  
    replaceAll (search, replacement, s) {
      var target = s;
      return target.split(search).join(replacement);
  }

	render(){
    const deltaPosition = this.state.deltaPosition;
    var resultsParser= this.state.results
	return(
      <div className="App-background">
            <img src={logo} className="App-logo2" alt="logo" />
            <div style={loginStyles} className="effect1">
      <h1> Google Maps </h1>
      <hr style={{marginTop: "10px", marginBottom: "10px"}} />
      <p>
      <label> 
      Location: 
        <input type="text" value={this.state.value} onChange={this.handleChangeSubmitLocation.bind(this)} />
        <button onClick={this.handleSubmitLocation.bind(this)}>Submit</button>
        <button onClick={ this.getDeviceLocation.bind(this) }> Use Device Location </button> 
        
      </label>
      </p> 
      
        <label> 
          Radius:
          <input type="text" value={this.state.userRadius} onChange={this.handleChangeRadius.bind(this)}/> 
        </label>  
        <button onClick= {this.handleSubmitRadius.bind(this)}>Submit</button> 

  </div>
  </div>     
)}}

export default API