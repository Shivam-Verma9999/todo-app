import React, { Component } from 'react';

import './TodoList.css';

export default class TodoList extends Component {
    constructor(props) {
        super(props);
        console.log(props);
    }

    render() {
        let hasItems = (!this.props.list.length) ? false : true;
        console.log((hasItems) ? "List has items" : "List is empty");

        return <div className="TodoList">
            {(hasItems) ? <p>New TodoLists will show up here.</p> : <ul>
                {this.props.list.map(item => <li key={item.name}>{item.name}</li>)}
            </ul>
            }
        </div>
    }
}