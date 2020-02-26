import React, { Component } from 'react';

import './LoginEntryPoint.css';
import InputFeild from './InputField';

export default class LoginEntryPoint extends Component {
    constructor(props) {
        super(props);
    }
    onSubmit = (e) => {
        e.preventDefault();
        console.log(`Calling onSubmit in login form`);
        this.props.login();
    }
    render() {
        return <div className="loginContainer">
            <div className="login">
                <div className="formContainer">
                    <form action="./" onSubmit={this.onSubmit}>
                        <InputFeild label="Username" inputType="text" name="username" required={true} />
                        <InputFeild label="Password" inputType="password" name="Password" required={true} />
                        <InputFeild inputType="submit" />
                    </form>
                </div>

            </div>
        </div>
    }

}
