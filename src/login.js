import React, { Component } from 'react'
import { Redirect} from 'react-router-dom'
import { app, facebookProvider } from './base' 
import logo from './logo.png';
import facebook from './facebook.png'
import google from './google.png'

const loginStyles = {
    width: "90%",
    maxWidth: "315px",
    margin: "20px auto",
    borderRadius: "5px",
    padding: "20px",
    background: "white",
    color: "black",
    boxshadow: "10px 10px gray"
}


export class login extends Component {
    constructor(props){
        super(props)
        this.authWithFacebook = this.authWithFacebook.bind(this)
        this.authWithEmailPassword = this.authWithEmailPassword.bind(this)
        this.state = {
            redirect:false,
            emailentry: '',
            passwordentry: '',
            items: []
        }
    }

    authWithFacebook(){
        console.log("authenticated with fb")
        //will cause a popup to facebook
        app.auth().signInWithPopup(facebookProvider)
    }

    authWithEmailPassword(event){
        //prevents going to another page
        event.preventdefault()
        console.table([{
            email: this.emailInput.value,
            password: this.passwordinput.value
        }])
    }
    render() {
        if (this.state.redirect == true){
            return <Redirect to = '/' />
        }
        return (
            <div className="App-background">
            <img src={logo} className="App-logo2" alt="logo" />
            <div style={loginStyles} className="effect1">
            <button style={{width: "100%"}} type="submit" className="header"> <img src={facebook} /> Login with Facebook </button>
            <button style={{width: "100%"}} type="submit" className="header2"> <img src={google} /> Login with Google</button>

            {/* <button2 style={{width: "100%"}} type="submit" className="pt-button pt-intent-primary" onClick={() => this.authWithFacebook()}>Log In with Facebook</button2> */}
            <hr style={{marginTop: "10px", marginBottom: "10px"}} />
            <form onSubmit={(event) => this.authWithEmailPassword(event)}>
              <div style={{marginBottom: "20px"}} className="pt-callout pt-icon-info-sign">
                <h5>Welcome to SquadUp</h5>
                Enter your email and create a password to create an account!
              </div>
                <input style={{width: "98%"}} className="pt-input" name="email" type="email" ref={(input) => {this.emailInput = input}} placeholder="Email"></input>
                <input style={{width: "98%"}} className="pt-input" name="password" type="password" ref={(input) => {this.passwordInput = input}} placeholder="Password"></input>
              <button style={{width: "100%"}} type="submit" className="btn btn-primary" value="Log In"> Create Account</button>
              <button style={{width: "100%"}} type="submit" className="btn btn-primary" value="Log In"> Login to SquadUp</button>

            </form>
            </div>
            </div>
        )
      }
    }

export default login;
