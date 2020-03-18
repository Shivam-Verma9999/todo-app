import React from 'react';
import ItemCheckHolder from './ItemCheckHolder';
import EditComponent from './EditComponent';

import starColored from '../images/star-colored3.png'
import starFaded from '../images/star-faded.png';
/// holding simple content
/**
 *  showCheckBox = props.showCheckBox
 * key = props.key
 *  this.toggleDoneStatus(subTask) => props.onToggleDoneStatus
 * this.props.onListSelect(singleList)  => props.onListSelect
 * singleList.listName => props.listName
 * subTask.doneStatus => props.doneStatus
 * subTask.name => props.subTaskName
 * this.editClickHandler(subTask) =>  props.EditComponentEditClickHandler
 * this.onDeleteClickHandler(subTask) => props.EditComponentDeleteClickHandler
 * */

export default function ContentHolder(props) {
    if (props.isImportant) {
        console.log('important', props.textContent)
    }
    return <div className="content flex" key={props.key}>
        {/* show checkbox when it is passed in the props to show the checkbox */}

        {(props.showCheckBox) ?
            <div className="flex-grow-1">
                <ItemCheckHolder
                    toggleDoneStatus={props.onToggleDoneStatus}
                    onClickHandler={props.onClickHandler}
                    checked={props.doneStatus}
                    name={props.textContent}
                />
            </div>
            :
            <div className=" flex-grow-1 clickable"
                onClick={props.onListSelect}
            >
                {props.listName}
            </div>
        }
        {props.isImportant !== undefined &&
            <img className="clickable" onClick={props.toggleImp} src={props.isImportant ? starColored : starFaded} height="25px" alt="important" />
        }
        <EditComponent
            onEditClickHandler={props.EditComponentEditClickHandler}
            onDeleteClickHandler={props.EditComponentDeleteClickHandler}
        />
    </div>
}