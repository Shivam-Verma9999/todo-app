import React, { Component } from 'react';
import './ListView.css'
import EditComponent from './EditComponent';
import { config } from '../utility/requestConfig';
import Axios from 'axios';
export default class ListView extends Component {
    constructor(props) {
        super(props);
    }

    createNewList = (e) => {
        e.preventDefault();
        let newListName = e.target.newListName.value.trim();
        if (newListName) {
            this.props.onAddNewList(newListName);
        }
        e.target.newListName.value = '';

    }

    deleteClickHandler = (singleListName) => {
        console.log('deleting ListName', singleListName)
        this.props.onDeleteList(singleListName);
    }

    editClickHandler = (singleListName) => {
        console.log('editing listName', singleListName);

    }

    render() {


        return <div className="listView">
            {(!this.props.list || this.props.list.length === 0) ?
                "New List will appear here"
                :
                <ul>
                    {
                        this.props.list.map((singleList) => {
                            return <div key={singleList.listName} >
                                <span onClick={() => { this.props.onListSelect(singleList) }}>{singleList.listName}</span>
                                <EditComponent
                                    onEditClickHandler={() => this.editClickHandler(singleList.listName)}
                                    onDeleteClickHandler={() => this.deleteClickHandler(singleList.listName)}
                                />
                            </div>
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