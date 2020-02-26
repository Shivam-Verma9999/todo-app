import React, { Component } from 'react';
import TodoList from './TodoList';
import TodoSingleView from './TodoSingleView';

import './Dashboard.css';
export default class Dashboard extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        let list = [
            { name: "List 1", items: ["List item 1", "List item 2", "List item 3", "List item 4"] },
            { name: "List 2", items: ["List item 1", "List item 2", "List item 3", "List item 4"] },
            { name: "List 3", items: ["List item 1", "List item 2", "List item 3", "List item 4"] },
            { name: "List 4", items: ["List item 1", "List item 2", "List item 3", "List item 4"] },
            { name: "List 5", items: ["List item 1", "List item 2", "List item 3", "List item 4"] },
            { name: "List 6", items: ["List item 1", "List item 2", "List item 3", "List item 4"] },
        ]

        return <>
            <div className="dashboard">
                <div className="leftpane">
                    <TodoList list={list} />
                </div>
                <div className="rightpane">
                    <TodoSingleView />
                </div>
            </div>
        </>
    }
}