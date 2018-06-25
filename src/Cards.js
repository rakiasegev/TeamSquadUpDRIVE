import React, { Component } from 'react';
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
        const {x, y} = this.state.deltaPosition;
        this.setState({
          deltaPosition: {
            x: x + ui.deltaX,
            y: y + ui.deltaY,
          }
        });
       
      }

      handleSTOP(){ 
        this.completeSwipe() 
        this.setState({
        deltaPosition: {
            x: 0, y: 0
        },
      })}

    completeSwipe(){
        if(Math.abs(this.state.deltaPosition.x)>100 ){
            if(this.state.deltaPosition.x>0){ 
                this.setState({
                    countRight: this.state.countRight+1 
                })
            }else { 
                this.setState({
                    countLeft: this.state.countLeft+1 
                })
            }


            this.setState({
                visibility: "hidden",
            })
            if(this.state.currentResult<this.props.results.length-1){
                this.setState({
                    resultsCount: this.state.resultsCount+1 ,
                    deltaPosition: {
                        x: 0, y: 0
                    },
                    cardPosition: {x: 100, y: 100}
                })
                this.setData() 
                this.setState({
                    cardPosition: null,
                    visibility: "visible",
                    currentResult: this.state.resultsCount,       
                })
            }
            else {
                // LOAD RESULTS
            }


        }
        else { 
            console.log("MADE IT")
            this.setState({
                cardPosition: {x: 100, y: 100}
            })
        }
    }

    setData(){ 
        this.setState({ 
            Header: this.props.results[this.state.resultsCount].name,
            Rating: this.props.results[this.state.resultsCount].rating,
            IMG: this.props.results[this.state.resultsCount].photoReference,
            currentResult: this.state.resultsCount
        })
    }

render() { 
    if(this.props.results.length!=0 && this.state.visibility=="hidden")
    {
        this.setState({
            visibility: "visible"
        })
        if(this.state.inital){
            this.setData() 
            this.setState({
                inital: false
            })
        }
    }
    
    const deltaPosition = this.state.deltaPosition;
    return (
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











