import React, { Component } from 'react'
import { Redirect} from 'react-router-dom'
import { app, facebookProvider } from './base' 

const loginStyles = {
    width: "90%",
    maxWidth: "315px",
    margin: "20px auto",
    border: "1px solid #ddd",
    borderRadius: "5px",
    padding: "10px"
}

export class login extends Component {
    constructor(props){
        super(props)
        this.authWithFacebook = this.authWithFacebook.bind(this)
        this.authWithEmailPassword = this.authWithEmailPassword.bind(this)
    }
    
    authWithFacebook(){
        console.log("authenticated with fb")
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
        return (
            <div style={loginStyles}>
            <button style={{width: "100%"}} className="pt-button pt-intent-primary" onClick={() => this.authWithFacebook()}>Log In with Facebook</button>
            <hr style={{marginTop: "10px", marginBottom: "10px"}} />
            <form onSubmit={(event) => this.authWithEmailPassword(event)}>
              <div style={{marginBottom: "10px"}} className="pt-callout pt-icon-info-sign">
                <h5>Note</h5>
                If you don't have an account already, this form will create your account.
              </div>
              <label className="pt-label">
                Email
                <input style={{width: "100%"}} className="pt-input" name="email" type="email" ref={(input) => {this.emailInput = input}} placeholder="Email"></input>
              </label>
              <label className="pt-label">
                Password
                <input style={{width: "100%"}} className="pt-input" name="password" type="password" ref={(input) => {this.passwordInput = input}} placeholder="Password"></input>
              </label>
              <input style={{width: "100%"}} type="submit" className="pt-button pt-intent-primary" value="Log In"></input>
            </form>
            </div>
        )
      }
    }
    

export default login;
