import React from 'react';
import ItemCheckHolder from './ItemCheckHolder';
import EditComponent from './EditComponent';

import starColored from '../images/star-colored.png'
import starFaded from '../images/star-faded2.png';
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

    function getDueDateView(UTCString) {
        let dueDate = new Date(UTCString);
        let currentDate = new Date();
        let isExpired = currentDate.toLocaleDateString() > dueDate.toLocaleDateString();
        console.log(currentDate.toLocaleDateString(), dueDate.toLocaleDateString(), isExpired);
        let viewContent = dueDate.toDateString();
        return <span className={isExpired ? 'expired' : ''}>{viewContent}</span>
    }
    if (props.dueDate)
        console.log(getDueDateView(props.dueDate))

    return <div className="content" key={props.key}>
        {/* show checkbox when it is passed in the props to show the checkbox */}
        <div className="flex">

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
        <div className="date clickable" onClick={props.onClickHandler}>
            {
                props.dueDate && props.dueDate.length && getDueDateView(props.dueDate)
            }
        </div>
    </div>
}