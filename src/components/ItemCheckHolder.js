import React, { Component } from 'react';

import './ItemCheckHolder.css';

export default class ItemCheckHolder extends Component {

    getCheckBox = () => {
        let inpCheck = (this.props.checked) ? <input type="checkbox" defaultChecked onChange={this.toggleCheck} /> : <input type="checkbox" onChange={this.toggleCheck} />;
        return inpCheck;
    }

    onClick = (e) => {
        this.props.onClickHandler();
    }
    toggleCheck = (e) => {
        this.props.toggleDoneStatus();
    }
    render() {

        return <div className="itemCheckHolder">
            <div className="checkBox">
                {this.getCheckBox()}
            </div>
            <div onClick={this.onClick} className="text">
                {this.props.name}
            </div>
        </div >
    }
}