import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toast } from 'react-toastify';

import firebase from '../firebase';
import Aux from '../hoc/Aux';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';

import {loginUser} from '../redux/modules/auth';


var provider = new firebase.auth.GoogleAuthProvider();
const ga = window.ga;


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
      ga('send', 'pageview', 'login');
    }
  
    onSignIn = () => {
      ga('send', 'event', 'sign_in','signin_with_google_btn','empty state')
      const getUserData = result => {
        let token = result.credential ? result.credential.accessToken : null;
        let user = result.user;
        ga('send', 'event', 'sign_in','sign_in_success',user.uid)
        this.props.loginUser(user,token);
      };

      if(window.innerWidth < 768){
        firebase.auth().getRedirectResult(provider)
        .then(getUserData)
        .catch(error => {
          ga('send', 'event', 'sign_in','sign_in_error',error.message)

        }); 
      }
      else{
        firebase.auth().signInWithPopup(provider)
        .then(getUserData)
        .catch(error => {
            ga('send', 'event', 'sign_in','sign_in_error',error.message)
            toast.error("Failed to login, try again after sometime")
        });        
      }
    }

    onSignOut = () => {
      firebase.auth().signOut()
      .then(res => {
        ga('send', 'event', 'sign_out','logout_btn','logout_success')
      })
      .catch(error => {
            ga('send', 'event', 'sign_out','sign_out_error',error.message)
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
