import React from 'react';

import deleteImg from '../images/delete.svg';
import editImg from '../images/edit.svg';

import './EditComponent.css';

export default function EditComponent(props) {
    return <div className="editcomp" >
        {/* <button onClick={props.onEditClickHandler} >Edit</button> */}
        {/* <button onClick={props.onDeleteClickHandler}>Delete</button> */}
        <img className="edit-img" onClick={props.onEditClickHandler} src={editImg}></img>
        <img className="delete-img" onClick={props.onDeleteClickHandler} src={deleteImg}></img>
    </div>
}