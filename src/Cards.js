import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import querystring from 'querystring';
import ReactSwipe from 'react-swipe';
import './Cards.css'


export class Cards extends Component {
    constructor(props){
        super(props)
        this.state=({
            key: "AIzaSyBj5Bbl7_qJu0GpXIEpqvc_xzVBlyMPyKU",
            countRight: 0,
            countLeft: 0 

        })
    }
  next() {
    this.reactSwipe.next();
    this.setState({
        count: this.state.countRight+1
    })
    console.log("right", this.state.countRight)
    console.log('left', this.state.countLeft)
  }

  prev() {
    this.reactSwipe.next();
    this.setState({
        count: this.state.countLeft+1
    })
    console.log("right", this.state.countRight)
    console.log('left', this.state.countLeft)
  }
  

  
  render() {
    const paneNodes = this.props.results.map(i => {

        return <div className= "curatedCards">
         <p> Name: {i["name"]}</p>
         <p>Rating:{i["rating"]}</p> 
         <img className= "Image" type="image" crossOrigin="Anonymous" src= {'http://localhost:8080/https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=' + i['photoReference']+ "&key="+this.state.key }/> 
        </div>;
    })

    const query = querystring.parse(window.location.search.slice(1));

    // change Swipe.js options by query params
    const startSlide = parseInt(query.startSlide, 10) || 0;
    const swipeOptions = {
    startSlide: startSlide < paneNodes.length && startSlide >= 0 ? startSlide : 0,
    auto: parseInt(query.auto, 10) || 0,
    speed: parseInt(query.speed, 10) || 300,
    disableScroll: query.disableScroll === 'true',
    continuous: query.continuous === 'true',
    callback() {
        console.log('slide changed');
    },
    transitionEnd() {
        console.log('ended transition');
    }
    };






    return (
      <div className="center">
      
        <ReactSwipe ref={reactSwipe => this.reactSwipe = reactSwipe} className="mySwipe" swipeOptions={swipeOptions}>
            {paneNodes}
        </ReactSwipe>

        <div>
          <button type="button" onClick={this.next.bind(this)}>Prev</button>
          <button type="button" onClick={this.next.bind(this)}>Next</button>
        </div>
      </div>
    );
  }
}











/*
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Image } from "react-bootstrap";
import { Panel } from "react-bootstrap";
import { Button } from "react-bootstrap";
import ReactSwipe from 'react-swipe';

export class Cards extends Component {
    /*
  constructor(props) { 
    super(props) 
    this.state={ 
      title: "HOME",
      key: "AIzaSyBj5Bbl7_qJu0GpXIEpqvc_xzVBlyMPyKU"
    }
  }




render() {
    return (
      
        <ReactSwipe className="carousel" swipeOptions={{continuous: false}}>
                <div>PANE 1</div>
                <div>PANE 2</div>
                <div>PANE 3</div>
            </ReactSwipe>
            /*
            <div>
        <Panel className='Card1' bsStyle='primary'>
         <Panel.Heading> Hello </Panel.Heading>    
        <Image width="250px" crossOrigin="Anonymous" src= {'http://localhost:8080/https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=' + 'CmRaAAAAiJXePWe2z4gmIfMTlehvhKrzDWDSLt3qpzNTTb6ePG09O_9McUVlJqbCtwAtEsQShc3XPENqtszlszeFfAm5SlNQMqMpTblxfBHqkF5nOTxpmdrndfWTgeNLrYH3w99nEhCHIJhs2a4Ssv9xlRHz_7BgGhTSCIlnGXCRiDvvqu1PDOfl6_dbKg'+ "&key="+this.state.key} rounded/>
        <Panel.Body marginHeight="10%" marginWidth= "50%"><h3>Panel content</h3></Panel.Body>
        </Panel> 
      </div>
      
    );
}
}
*/ 