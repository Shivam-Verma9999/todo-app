import React from 'react';
export default function EditComponent(props) {
    return <div >
        <button onClick={props.onEditClickHandler} >Edit</button>
        <button onClick={props.onDeleteClickHandler}>Delete</button>
    </div>
}