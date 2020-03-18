import React, { Component } from 'react';

import './ItemCheckHolder.css';

export default class ItemCheckHolder extends Component {

    getCheckBox = () => {
        let inpCheck = (this.props.checked) ? <input type="checkbox" defaultChecked onChange={this.toggleCheck} className='clickable' /> : <input type="checkbox" onChange={this.toggleCheck} className='clickable' />;
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
            <div className="checkBox ">
                {this.getCheckBox()}
            </div>
            <div onClick={this.onClick} style={{ textDecoration: this.props.checked ? 'line-through' : '' }} className="text clickable">
                {this.props.name}
            </div>
        </div >
    }
}