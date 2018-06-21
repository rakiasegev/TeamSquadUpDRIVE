import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import querystring from 'querystring';
import ReactSwipe from 'react-swipe';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';
import Draggable from 'react-draggable'; // The default

import './Cards.css'


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
            visibility: "visible"
        })
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

render() { 
    
    const deltaPosition = this.state.deltaPosition;
    return (
    <div className= "BOX">
      X: {this.state.deltaPosition.x}
      Y: {this.state.deltaPosition.y}
      <Draggable
        className= "B1"
        axis="x"
        handle=".handle"
        defaultPosition={{x: 100, y: 100}}
        position={null}
        grid={[25, 25]}
        onStart={this.handleStart}
        onDrag={this.handleD.bind(this)}
        onStop={this.handleStop}>
        <div>
          <div className="handle">
          <Card className={"Card-"+this.state.visibility}>
          <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
          <CardBody>
          <CardTitle>Card title</CardTitle>
          <CardSubtitle>Card subtitle</CardSubtitle>
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











