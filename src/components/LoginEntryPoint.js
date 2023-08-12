import React, { Component } from 'react';
import axios from 'axios';
import './LoginEntryPoint.css';

import { config, API_URL } from '../utility/Config';

import logoImg from '../images/todo-icon.png';
export default class LoginEntryPoint extends Component {

    onSubmit = (e) => {
        e.preventDefault();

        let errorDiv = document.querySelector('.loginError');

        if (errorDiv.classList.contains('loginErrorActive')) {
            errorDiv.classList.remove('loginErrorActive');
        }
        errorDiv.innerHTML = "";
        // alert('dfsd');
        console.log(`Calling onSubmit in login form`);
        // console.log(e.target);
        let username = e.target.username.value.trim();
        let url = `${API_URL}/auth/signIn`;
        // console.log(username);
        let password = e.target.password.value.trim();



        let body = {
            username: (username),
            password: encodeURIComponent(password)
        };


        console.log(body.username);
        axios.post(url, body, config)
            .then((result) => {
                console.log('then', result);
                if (result.status !== 200) {
                    // alert('wrong username or password');
                    errorDiv.classList.add('loginErrorActive');
                    errorDiv.innerHTML = 'Wrong username or password';

                } else {
                    this.props.login();
                }
            })
            .catch((err) => {
                // Do somthing
                // console.log('errr', err);
                // alert(err);
            })

    }

    //TODO: show email varification message
    render() {
        return <div className="container">
            <div className="form">
                <div className="welcome">
                    <div className="logo-img">
                        <img src={logoImg} height="100%" alt="person" />
                    </div>
                    <h1>Welcome,</h1>
                    <p>Lets plan your day</p>
                </div>
                <div className="loginError">
                </div>
                <div className="form-container">
                    <form onSubmit={this.onSubmit}>
                        <label for="username">Email</label>
                        <br />
                        <input id="username" name="username" type="email" />
                        <br />
                        <label for="password">Password</label>
                        <br />
                        <input id="password" name="password" type="password" />
                        <br />
                        <input type="submit" value="Login" />
                    </form>
                </div>
                <div className="message">
                    Dont have an account?, <a href="./signup.html">Signup</a>
                </div>
            </div>
        </div>
    }

}
