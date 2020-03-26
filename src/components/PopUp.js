import React from 'react';
import './PopUp.css';

/**
 * 
 * props.name => initial name
 * props.callBack() => callBackFunction to be called when edited with new value 
 */
export default function PopUp(props) {

    let removePopup = () => {
        if (props.removePopup) props.removePopup();
    }

    let confirm = () => {
        let newContent = document.querySelector('#pnewName').value;
        console.log("Edited name", newContent);

        props.callBack(newContent);
        removePopup();
    }

    let cancel = () => {
        removePopup();
    }

    let submitHandler = (event) => {
        event.preventDefault();
        confirm();
    }

    return <div onClick={removePopup} className="popup-modal">
        <div className="popup" onClick={(event) => event.stopPropagation()}>
            <div className="upper">
                <div>Edit {props.name} name</div>
                {/* <br /> */}
                <form onSubmit={submitHandler}>
                    <input autoFocus id="pnewName" defaultValue={props.initialContent} />
                </form>
            </div>
            <div className=" lower btns">
                <button name="cancel" onClick={cancel} className="clickable" >Cancel</button>
                <button name="confirm" onClick={confirm} className="clickable" > Confirm</button>
            </div>
        </div>
    </div>
}