import React, { Component } from 'react'
import { EHOSTUNREACH } from 'constants';


export class YelpAPI extends React.Component {
    constructor() { 
        super() 
        this.state= {
            value: "",
            latitude: 0,
            longitude:0,
            userRadius:0 ,
            results: "" 
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
        url: 'http://localhost:8080/https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key=AIzaSyBj5Bbl7_qJu0GpXIEpqvc_xzVBlyMPyKU&input='+ this.state.value+'&inputtype=textquery',
      }, function(err, res, body) {
        if (err) {
          console.error(err);
        } else {
          var obj = JSON.parse(body)
          var placeID= obj.candidates[0].place_id
          const quest = require('request');
          quest({
            url: "http://localhost:8080/https://maps.googleapis.com/maps/api/place/details/json?placeid="+placeID+"&key=AIzaSyBj5Bbl7_qJu0GpXIEpqvc_xzVBlyMPyKU"
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
            url: 'http://localhost:8080/https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyBj5Bbl7_qJu0GpXIEpqvc_xzVBlyMPyKU&location='+this.state.latitude+","+ this.state.longitude+'&rankby=distance&type=restaurant'
          },function(err,res,body){
            if(!err){
              var output= ""
              const resultsJSON = JSON.parse(body)

              const results= resultsJSON.results
              console.log(results)
              Object.values(results).forEach(function(result){
                output= output+ "\n" + result.name
              })
              this.setState({
                results: output
              })
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
              url: 'http://localhost:8080/https://maps.googleapis.com/maps/api/geocode/json?latlng='+this.state.latitude+","+ this.state.longitude+"&key=AIzaSyBj5Bbl7_qJu0GpXIEpqvc_xzVBlyMPyKU"
            }, function(err, res, body) {
              if (err) {
                console.error(err);
              } else {
                console.log(body)
            }})
          this.GMapsNearby()
          }
          
      
          getLocationError(){ 
            console.log("NOPE")
            return ("NOPE")
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
      
	render(){
	return(
    <div> 
      <h1> Google Maps </h1>
      <p>
      <label>
        Location: 
        <input type="text" value={this.state.value} onChange={this.handleChangeSubmitLocation.bind(this)} />
        <button onClick={this.handleSubmitLocation.bind(this)}>Submit</button>
        <button onClick={ this.getDeviceLocation.bind(this) }> Use Device Location </button> 

      </label>
      </p> 
      <p>
        <label>
          Radius:
          <input type="text" value={this.state.userRadius} onChange={this.handleChangeRadius.bind(this)}/> 
        </label>  
        <button onClick= {this.handleSubmitRadius.bind(this)}>Submit</button> 
        <p>
        {this.state.results.split("\n").map(i => {
            return <div>{i}</div>;
        })}
        </p>
      </p> 
    </div> 
)}}