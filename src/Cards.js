// Called by SwiperNoSwiping and Generates Cards with the results passed down to it through 
// props named results
import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';
import Draggable from 'react-draggable'; // The default
import './Cards.css'
import * as firebase from 'firebase';
var config = {
  apiKey: "AIzaSyCor4vAkog6uforo0X1fYRQmpSc1eXSH0I",
  authDomain: "swiperrrrrr.firebaseapp.com",
  databaseURL: "https://swiperrrrrr.firebaseio.com",
  storageBucket: "swiperrrrrr.appspot.com",
};


export class Cards extends Component {
    constructor(props){
        super(props)
        this.state=({
            key: "AIzaSyBj5Bbl7_qJu0GpXIEpqvc_xzVBlyMPyKU",
            countRight: 0,
            countLeft: 0 ,
            deltaPosition: {
                x: 0, y: 0
            },
            visibility: "hidden",
            resultsCount: 0,
            currentResult:0,
            cardPosition: null,
            inital: true,
            Header: null,
            Rating: null, 
            IMG: null,
        })
        console.log(this.props)
    }

    handleD(e, ui) {
        // Handles the drag and collects the deltas of the cards being dragged around
        const {x, y} = this.state.deltaPosition;
        this.setState({
          deltaPosition: {
            x: x + ui.deltaX,
            y: y + ui.deltaY,
          }
        });
       
      }

      handleSTOP(){ 
        // Handles the release of the card after being dragged. 
        this.completeSwipe() 
        this.setState({
        deltaPosition: {
            x: 0, y: 0
        },
      })}

    completeSwipe(){
        // registers the direction in which the swipe took place. 
        // Updates the values in firebase (assuming firebase has a list of results with list of results)
        if(Math.abs(this.state.deltaPosition.x)>100 ){ // Checks if swipe delta > 100
            var restaurantName=this.state.Header
            const ResultsRef = firebase.database().ref('Results').child(restaurantName)

            if(this.state.deltaPosition.x>0){ // Swipe Right
                this.setState({
                    countRight: this.state.countRight+1 
                })
            ResultsRef.once("value", function(snapshot){
                var count=snapshot.val().right
                console.log(count)
                var updates = {}
                updates['right']=count+1
                ResultsRef.update(updates)
                })}
            else {  // Swipe Left
                this.setState({
                    countLeft: this.state.countLeft+1 
                })
                ResultsRef.once("value",function(snapshot){
                    var count=snapshot.val().left
                    const updates = {}    
                    updates['left']= count + 1
                    ResultsRef.update(updates)})
            }
            // Hide the card
            this.setState({
                visibility: "hidden",
            })
            // Reposition the cards and reset the deltas
            if(this.state.currentResult<this.props.results.length-1){
                this.setState({
                    resultsCount: this.state.resultsCount+1 ,
                    deltaPosition: {
                        x: 0, y: 0
                    },
                    cardPosition: {x: 0, y: 0}
                })
                this.setData() // Updating card info
                this.setState({
                    cardPosition: null,
                    visibility: "visible",
                    currentResult: this.state.resultsCount,       
                })
            }
            else {
                // LOAD RESULTS- all swipes are completed and the results page is ready to be loaded. 
            }


        }
        else {
            // If the swipe position deltas is not greater than 100px than the position is reset
            console.log("MADE IT")
            this.setState({
                cardPosition: {x: 100, y: 100}
            })
        }
    }

    setData(){ 
        // Updating the information on the card with the results on the next list of results 
        this.setState({ 
            Header: this.props.results[this.state.resultsCount].name,
            Rating: this.props.results[this.state.resultsCount].rating,
            IMG: this.props.results[this.state.resultsCount].photoReference,
            currentResult: this.state.resultsCount
        })
    }

render() { 
    if(this.props.results.length!=0 && this.state.visibility=="hidden")
    { // If the results are finally generated by API, start displaying the cards
        this.setState({
            visibility: "visible"
        })
        if(this.state.inital){
            // If this is the first call for the cards, load the data into them.
            this.setData() 
            this.setState({
                inital: false
            })
        }
    }
    
    const deltaPosition = this.state.deltaPosition;
    return (
    // Loads the elements of a single card at a time. 
    <div className= "BOX">
      X: {this.state.deltaPosition.x},   
      Y: {this.state.deltaPosition.y},  
      LeftCount: {this.state.countLeft},  
      RightCount: {this.state.countRight}
      <Draggable
        className= "B1"
        axis="x"
        handle=".handle"
        defaultPosition={{x: 100, y: 100}}
        position={this.state.cardPosition}
        grid={[25, 25]}
        onStart={this.handleStart}
        onDrag={this.handleD.bind(this)}
        onStop={this.handleSTOP.bind(this)}>
        <div>
          <div className="handle">
          <Card className={"Card-"+this.state.visibility}>
          <CardImg top width="100%" crossOrigin="Anonymous" src= {'http://localhost:8080/https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=' + this.state.IMG+ "&key="+this.state.key } alt="Card image cap" />
          <CardBody>
          <CardTitle>{this.state.Header}</CardTitle>
          <CardSubtitle>Rating: {this.state.Rating}</CardSubtitle>
          <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
          <div>x: {deltaPosition.x.toFixed(0)}, y: {deltaPosition.y.toFixed(0)}</div>          </CardBody>
          </Card>
          </div>
        </div>
      </Draggable>
    </div>
    )
}


}
export default Cards











