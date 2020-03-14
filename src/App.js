import React from 'react';
import LoginEntryPoint from './components/LoginEntryPoint';
import Dashboard from './components/Dashboard';
import './App.css';


export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            loggedIn: false
        }

    }

    // for logging in and changing the state to logged in 
    doLogin = () => {
        console.log("calling from App.js");
        document.cookie = 'loggedIn=true';
        this.setState((prevState, props) => {
            return { loggedIn: true }
        });
    }

    // logging out
    // clearing the loggedIn state cookie
    logout = () => {
        console.log('logging out');
        document.cookie = 'loggedIn=false';
        this.setState((prevState, props) => {
            return { loggedIn: false };
        })
    }

    render() {
        return <>

            {(this.state.loggedIn) ? <Dashboard /> : <LoginEntryPoint login={this.doLogin} />}
        </>
    }


    //checking last time loggedIn status if loggedIn is true then open dashboard
    //else keep on login page
    componentWillMount() {
        const cok_obj = {};
        if (document.cookie) {
            let cok_ar = document.cookie.split(';');
            cok_ar.forEach(cok => {
                cok = cok.trim();
                cok_obj[cok.split('=')[0]] = cok.split('=')[1];
            });
        }
        console.log(cok_obj);

        if (cok_obj['loggedIn']) {
            this.setState((prevState, props) => {
                return { loggedIn: cok_obj['loggedIn'] === 'true' };
            })
        }
    }


}