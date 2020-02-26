import React from 'react';


import InputField from './InputField';

export default class Form extends React.Component {

    //form validation 
    validateForm = (formObj) => {
        let res = {
            valid: true,
            field: ""
        }
        if (!formObj.username.value.trim()) {
            res.valid = false;
            res.field = "username";
        } else if (!formObj.password.value.trim()) {
            res.valid = false;
            res.field = "password";
        }

        return res;
    }

    //processing submitted form
    // called on submit
    onSubmitForm = (e) => {
        e.preventDefault();
        // let fe = e;
        console.log("Form submitted");
        let validationResult = this.validateForm(e.target);

        if (validationResult.valid) {
            console.log("valid form ");
            console.log("username:", e.target.username.value.trim());
            console.log("password:", e.target.password.value.trim());
        } else {
            //TODO : show something less annoying
            alert(`${validationResult.field} cannnot be empty`);
        }
    }

    render() {
        console.log("Rendering form");
        return <>
            <form onSubmit={this.onSubmitForm}>
                <InputField label="username" name="username" inputType="text" />
                <InputField label="Password" name="password" inputType="password" />
                <button type="submit" >Login</button>
            </form>
        </>
    }
}