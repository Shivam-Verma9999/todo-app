import React, { Component } from 'react';
import './ListView.css'
import AddForm from './AddForm';
import ContentHolder from './ContentHolder';
import PopUp from './PopUp';

export default class ListView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            shouldShowPopup: false,
            listToBeEdited: undefined,
            value: ""
        }
    }

    createNewList = (newListName) => {
        this.props.onAddNewList(newListName);
    }

    deleteClickHandler = (singleListName) => {
        // console.log('deleting ListName', singleListName)
        if (window.confirm(`Delete List "${singleListName.listName}?"`))
            this.props.onDeleteList(singleListName);
    }

    showPopup = (singleList) => {
        this.setState({ shouldShowPopup: true, listToBeEdited: singleList, value: singleList.listName });
    }
    removePopup = () => {
        this.setState({ shouldShowPopup: false, listToBeEdited: undefined, value: "" });
    }

    editClickHandler = ({ singleList, newName }) => {
        console.log('editing listName', singleList);
        let editedListName = newName;
        if (editedListName === null) return;
        editedListName = editedListName.trim();
        if (editedListName !== singleList) {
            this.props.editListName({ oldSingleList: singleList, newListName: editedListName });
        }
    }

    render() {


        return <div className="listView">
            {
                this.state.shouldShowPopup
                &&
                <PopUp
                    initialContent={this.state.value}
                    name='ToDo'
                    callBack={(newName) => { this.editClickHandler({ singleList: this.state.listToBeEdited, newName }) }}
                    removePopup={this.removePopup}
                />
            }
            <div>
                <ul>
                    <h2>TODO</h2>
                    {
                        (this.props.list.length === 0) ?
                            "New TODOs will appear here"
                            :
                            this.props.list.map((singleList) => {
                                // return <div className="content flex" key={singleList.id} >
                                //     <div className="pointer flex-grow-1" onClick={() => { this.props.onListSelect(singleList) }}>{singleList.listName}</div>
                                //     <EditComponent
                                //         onEditClickHandler={() => this.editClickHandler(singleList)}
                                //         onDeleteClickHandler={() => this.deleteClickHandler(singleList)}
                                //     />
                                // </div>

                                return <ContentHolder
                                    key={singleList.id}
                                    onListSelect={() => { this.props.onListSelect(singleList) }}
                                    listName={singleList.listName}
                                    // EditComponentEditClickHandler={() => { this.editClickHandler(singleList) }}
                                    EditComponentEditClickHandler={() => { this.showPopup(singleList) }}
                                    EditComponentDeleteClickHandler={() => { this.deleteClickHandler(singleList) }}

                                />
                            })

                    }
                    <AddForm
                        onSubmit={this.createNewList}
                    />
                </ul>

            </div>

        </div>
    }



}