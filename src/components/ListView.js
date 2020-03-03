import React, { Component } from 'react';

import './ListView.css'

export default class ListView extends Component {

    createNewList = (e) => {
        e.preventDefault();
        let newListName = e.target.newListName.value.trim();
        if (newListName) {
            this.props.onAddNewList(newListName);
        }
        e.target.newListName.value = '';

    }

    render() {

        console.log('list ', this.props.list);
        return <div className="listView">
            {(this.props.list.length === 0) ?
                "New List will appear here"
                :
                <ul>
                    {
                        this.props.list.map((singleList) => {
                            return <li
                                key={singleList.listName}
                                onClick={() => { this.props.onListSelect(singleList) }}
                            >{singleList.listName}
                            </li>
                        })
                    }
                </ul>
            }
            <form onSubmit={this.createNewList}>
                <input type='text' name="newListName" />
                <button type="submit">AddNewList</button>
            </form>
        </div>
    }

}