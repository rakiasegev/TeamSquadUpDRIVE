import React, { Component } from 'react'
import { Redirect} from 'react-router-dom'
import firebase, {auth, provider} from './firebase' 
import logo from './logo.png';
import facebook from './facebook.png'
import google from './google.png'

const loginStyles = {
    width: "90%",
    maxWidth: "315px",
    margin: "20px auto",
    border: "2px solid #38abb4",
    borderRadius: "5px",
    padding: "20px",
    background: "white",
    color: "black"
}

const loginStylesOuter = {
    width: "90%",
    maxWidth: "30%",
    margin: "20px auto",
    border: "2px solid white",
    borderRadius: "5px",
    padding: "20px",
    background: "#38abb4",
}


export class login extends React.Component {
    constructor(){
        super();
        //this.authWithFacebook = this.authWithFacebook.bind(this)
        
        this.state = {
            redirect:false,
            emailentry: '',
            passwordentry: '',
            items: [],
            user: null
        }
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }

    /*
    authWithFacebook(){
        console.log("authenticated with fb")
        //will cause a popup to facebook
        app.auth().signInWithPopup(facebookProvider)
    }
    

    authWithEmailPassword(event){
        //prevents going to another page
        event.preventDefault()
        console.table([{
            email: this.emailInput.value,
            password: this.passwordinput.value
        }])
    }

    */

   logout() {
    auth.signOut()
      .then(() => {
        this.setState({
          user: null
        });
      });
  }

  login() {
    auth.signInWithPopup(provider) 
      .then((result) => {
        const user = result.user;
        this.setState({
          user
        });
      });
  }

  //keeps the user logged in
  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      } 
    });}

    render() {
        if (this.state.redirect == true){
            return <Redirect to = '/' />
        }
        return (
            <div className="App-background">
            <img src={logo} className="App-logo2" alt="logo" />
            <div style={loginStylesOuter}>
            <div style={loginStyles}>
           
            <button style={{width: "100%"}} type="submit" className="header"> <img src={facebook}  /> Login with Facebook </button>
            <button style={{width: "100%"}} type="submit" className="header2" onClick={this.login}> <img src={google} onClick={this.login} /> Login with Google</button>
            <hr style={{marginTop: "10px", marginBottom: "10px"}} />
            <form onSubmit={(event) => this.login}>
              <div style={{marginBottom: "20px"}} className="pt-callout pt-icon-info-sign">
                <h5>Welcome to SquadUp</h5>
                Enter your email and create a password to create an account!
              </div>
              <label className="pt-label" >
                Email
                <input style={{width: "98%"}} className="pt-input" name="email" type="email" ref={(input) => {this.emailInput = input}} placeholder="Email"></input>
              </label>
              <label className="pt-label">
                Password
                <input style={{width: "98%"}} className="pt-input" name="password" type="password" ref={(input) => {this.passwordInput = input}} placeholder="Password"></input>
              </label>
              <button style={{width: "100%"}} type="submit" className="btn btn-primary" value="Log In"> Create Account</button>
            </form>
            </div>
            </div>
            </div>
        )
      }
    }

export default login;
