import React, { Component } from 'react';
import './App.css';
import {auth, provider, facebookProvider} from './firebase.js';
import logo from './logo.png'
import facebook from './facebook.png'
import google from './google.png'
import {SwiperNoSwiping} from './SwiperNoSwiping'

const loginStyles = {
  width: "90%",
  margin: "20px auto",
  borderRadius: "5px",
  padding: "20px",
  background: "white",
  color: "black",
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null 
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.fblogin = this.fblogin.bind(this);
  }
  
  //receives inputs from our inputs and updates the corresponding piece of state
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  //when signout method is called, we remove the user from our app's state
  logout(){
    auth.signOut()
    .then(() => {
      this.setState({
        user:null
      });
    });
  }

  /*
  -signInWithPopup will trigger a popup login option to sign in with a Google account
  */
  login() {
    auth.signInWithPopup(provider) 
      .then((result) => {
        const user = result.user;
        this.setState({
          user
        });
      });
  }

  fblogin(){
    auth.signInWithPopup(facebookProvider)
    .then((result)=> {
      const user = result.user;
      this.setState({
        user
      });
    });
  }

  //event listener for our form
  handleSubmit(e) {
    //prevents the page from refreshing
    e.preventDefault();
      this.setState({
      username: ''
    });
  }
  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      } 
    });}    
    
  render() {
  if(!this.state.user){
    return (
    <div className="App-background">
            <img src={logo} className="App-logo2" alt="logo" />
              <h1>{this.state.title}</h1>
            {/*}
              {
                this.state.user?
                <button onClick={this.logout}>Log Out </button>
                :
                <button onClick={this.login}>Login In</button>
              }*/}
        <div style={loginStyles} className="effect1">              
            </div>
            
        {this.state.user ?
          <div>
            <div className='user-profile'>
              <img src={this.state.user.photoURL} />
            </div>
          </div>
          :
          <div className='text_input'>
          <h5>Welcome to SquadUp</h5>
              <p>You must be logged in to see the group events.</p>
          </div>
      }     
          <section className='add-item'>
                <form onSubmit={this.handleSubmit}>
                {/*this is where we need to modify to math current website
                  <input type="text" name="username" placeholder="What's your name?" onChange={this.handleChange} value={this.state.username} />
                  <input type="text" name="currentItem" placeholder="What are you bringing?" onChange={this.handleChange} value={this.state.currentItem} />
                  <button>Add Item</button>
                */}
                <div style={{textAlign: "center"}} className="pt-callout pt-icon-info-sign">
                <input style={{width: "98%"}} type="text" name="username" placeholder="Username" />
                <input style={{width: "98%"}} type="text" name="currentItem" placeholder="Password" />
                <button style={{width: "100%"}} type="submit" className="btn btn-primary" value="Log In"> Login to SquadUp</button>
                <button style={{width: "100%"}} type="submit" className="btn btn-primary" value="Log In"> Create Account</button>
                <hr style={{marginTop: "10px", marginBottom: "10px"}} />
                </div>
          <div className='wrapper'>
              <p>You must be logged in to start group decisions.</p>
          </div>
          </form>
          </section>
        }

        <div className='container'>
          <section className='add-item'>
                <form onSubmit={this.handleSubmit}>
                <input type="text" name="username" placeholder="Username" />
                <input type="text" name="currentItem" placeholder="Password" />
                {this.state.user?
               <button style={{width: "100%"}} type="submit" className="header" onClick = {this.logout}> <img src={facebook} onClick = {this.logout} /> Logout of Facebook </button>
               :
               <button style={{width: "100%"}} type="submit" className="header" onClick = {this.fblogin}> <img src={facebook} onClick = {this.fblogin} /> Login with Facebook </button>
                }
               {this.state.user?
              <button style={{width: "100%"}} className="header2" onClick = {this.logout}> <img src={google} onClick={this.logout} /> Logout of Google</button>
                :
              <button style={{width: "100%"}} className="header2" onClick={this.login}> <img src={google} onClick={this.login} /> Login with Google</button>
               }              
                </form>
          </section>
        </div>
      </div>
    )} 
    else {
      return (<SwiperNoSwiping/>)
    }
  }
}
export default App;