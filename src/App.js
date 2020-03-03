import React from 'react';
import LoginEntryPoint from './components/LoginEntryPoint';
import Dashboard from './components/Dashboard';
import './App.css';


export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loggedIn: true
    }
  }

  doLogin = () => {
    console.log("calling from App.js");
    this.setState((prevState, props) => {
      return { loggedIn: !prevState.loggedIn }
    });
    setTimeout(() => console.log('loggedIn', this.state.loggedIn), 1000);
  }
  render() {
    return <>
      {(this.state.loggedIn) ? <Dashboard /> : <LoginEntryPoint login={this.doLogin} />}
    </>
  }
}