import React from 'react';

import addIcon from '../images/icon-add2.png';

import './AddForm.css';
export default function AddForm(props) {
    let submitHandler = (e) => {
        e.preventDefault();
        let newName = e.target.newName.value.trim();
        e.target.newName.value = '';
        if (newName.length > 0)
            props.onSubmit(newName);
    }
    return (
        <form id="addForm" onSubmit={submitHandler}>
            <input autoComplete='off' type='text' name="newName" />
            <button className="clickable" type="submit" ><img src={addIcon} /></button>
        </form>
    )
}