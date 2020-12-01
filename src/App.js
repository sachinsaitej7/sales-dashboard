import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router';
import './App.css';
import { Route,Switch, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { push } from 'react-router-redux';
import { loginUser,logoutUser } from './redux/modules/auth';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';  // material ui components require a theme
import 'bootstrap/dist/css/bootstrap.min.css';

// import asyncComponent from './hoc/AsyncComponent';
import AuthenticatedRoute from './hoc/AuthenticatedRoute';
import CheckAuthRoute from './hoc/CheckAuthRoute';
import {get} from './helpers/LocalStorageHelper';

import Login from './containers/Login';
import Header from './containers/Header';
import Dashboard from './containers/Dashboard';

export default withRouter(connect(
  store => ({
    user: store.auth.user,
  }),
  dispatch => bindActionCreators({
    push,
    loginUser,
    logoutUser,
  },dispatch))
(class App extends Component {

  constructor(props){
    super(props);
    this.paths = {
    }
  }

  componentWillMount() {
    const user = JSON.parse(get("user"));
    const accessToken = get("accessToken");
    if(user){
      this.props.loginUser(user,accessToken);
    }
  }


  componentDidCatch(error, errorInfo) {

  }

  componentWillReceiveProps(nextProps) {
    
  }


  /** check if current path is valid/allowed path for user */
  isPathValid = () => {
    // const pathname = this.props.location.pathname;
    // const user = this.props.user;


  }

  

  render() {
    // const pathname = this.props.location.pathname;
    // const user = this.props.user;
    this.isPathValid();
    return (
      <MuiThemeProvider>
        <div className="App">
          <Header { ...this.props } ></Header>

          <main>
            <Switch>
              <Route exact path="/login" render={(props) => <CheckAuthRoute component={Login} {...this.props} {...props}/>} />
              <Route exact path="/dashboard" render={(props) => <AuthenticatedRoute component={Dashboard} {...this.props} {...props} />}/>
              <Route render={(props) => <Redirect to={{
                pathname: '/login',
                search: this.props.location.search,
              }} />} />
              
            </Switch>

            <ToastContainer position="top-center" hideProgressBar={true}
              style={{ marginTop: '120px', lineHeight: '20px', paddingTop: 16,
              textAlign: 'center', fontSize: 14}}
              />
          </main>
        </div>
      </MuiThemeProvider>
    );
  }
}))
