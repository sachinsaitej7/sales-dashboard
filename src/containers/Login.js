import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import firebase from '../firebase';
import Aux from '../hoc/Aux/Aux';
import Form from 'react-bootstrap/Form';
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
          // Handle Errors here.
          // var errorCode = error.code;
          // var errorMessage = error.message;
          // this.props.loginUser(null,null,errorMessage)
          // The email of the user's account used.
          // var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          // var credential = error.credential;
          // ...
        });        
      }
    }

    onSignOut = () => {
      firebase.auth().signOut()
      .then(res => {
      })
      .catch(error => {
      });
    }

    onChange = (type,value) => {
      this.setState({
        [type]: value
      })
    }
    

    render () {
        let email = this.state.email;
        let password = this.state.password;

        return (
          <Aux className="signup-container">
            <h2 style={{marginBottom:"10px",textAlign:"center"}}>Sign in</h2>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => this.onChange('email',e.target.value)} />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={password} onChange={e => this.onChange('password',e.target.value)}/>
              </Form.Group>
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
              </Form.Group>
              <div style={{display:"flex",justifyContent:"space-between",flexDirection:"row"}}>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
                <div  style={{width:"50px"}} onClick={this.onSignIn}>Google </div>
                <div onClick={this.onSignOut}> Sign out</div>
              </div>
            </Form>
          </Aux>
        );
    }
})
