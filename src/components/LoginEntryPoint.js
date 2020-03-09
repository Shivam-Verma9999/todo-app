import React, { Component } from 'react';
import axios from 'axios';
import './LoginEntryPoint.css';
import InputFeild from './InputField';
import { config } from '../utility/requestConfig';
export default class LoginEntryPoint extends Component {

    onSubmit = (e) => {
        e.preventDefault();
        console.log(`Calling onSubmit in login form`);
        // console.log(e.target);
        let username = e.target.username.value.trim();
        let url = "http://localhost:3000/auth/signIn";
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
                if (result.statusText !== 'Login Successful') {
                    alert('wrong username or password');
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
    render() {
        return <div className="loginContainer">
            <div className="login">
                <div className="formContainer">
                    <form action="./" onSubmit={this.onSubmit}>
                        <InputFeild label="Username" inputType="text" name="username" required={true} />
                        <InputFeild label="Password" inputType="password" name="password" required={true} />
                        <InputFeild inputType="submit" />
                    </form>
                </div>

            </div>
        </div>
    }

}
