import React from 'react';
import './inputField.css'


function InputFeild(props) {
    console.log(props);
    return (
        <div className="inpfld">
            <span>{props.label ? props.label : "Label"}</span>
            <br />
            <input
                type={props.inputType ? props.inputType : "text"}
                name={props.name}
                autoComplete="off"
                required={props.required ? props.required : false}
            />
        </div>
    )
};

export default InputFeild;