import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toast } from 'react-toastify';

import firebase from '../firebase';
import Aux from '../hoc/Aux/Aux';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';

import {loginUser} from '../redux/modules/auth';


var provider = new firebase.auth.GoogleAuthProvider();


export default connect(
  store => ({
    user: store.auth.user,
  }),
  dispatch => bindActionCreators({
    loginUser
  }, dispatch))(class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
          email: "",
          error: "",
          password: "",

        }
    }

    componentDidMount () {

    }
  
    onSignIn = () => {
      let getUserData = result => {
        var token = result.credential ? result.credential.accessToken : null;
        var user = result.user;
        this.props.loginUser(user,token);
      };

      if(window.innerWidth < 768){
        firebase.auth().getRedirectResult(provider)
        .then(getUserData)
        .catch(error => {
        }); 
      }
      else{
        firebase.auth().signInWithPopup(provider)
        .then(getUserData)
        .catch(error => {
            toast.error("Failed to login, try again after sometime")
        });        
      }
    }

    onSignOut = () => {
      firebase.auth().signOut()
      .then(res => {

      })
      .catch(error => {
            toast.error("Failed to logout, try again after sometime")
      });
    }

    onChange = (type,value) => {
      this.setState({
        [type]: value
      })
    }
    

    render () {
        return (
          <Aux className="signup-container">
            <Jumbotron fluid>
              <Aux>
                <h2>Sales Dashboard</h2>
                <p>
                  Login to dashboard to view the reports of different company sales data accross the globe
                </p>
                <Button onClick={this.onSignIn} variant="outline-primary"> Signin with Google</Button>
                <p style={{fontSize:"12px",color:"rgba(0,0,0,0.57)",marginTop:"4px"}}>we never share your data with anyone</p>
              </Aux>
            </Jumbotron>
          </Aux>
        );
    }
})
