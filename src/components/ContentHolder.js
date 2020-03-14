import React from 'react';
import ItemCheckHolder from './ItemCheckHolder';
import EditComponent from './EditComponent';

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
            <div className="pointer flex-grow-1"
                onClick={props.onListSelect}
            >
                {props.listName}
            </div>
        }
        <EditComponent
            onEditClickHandler={props.EditComponentEditClickHandler}
            onDeleteClickHandler={props.EditComponentDeleteClickHandler}
        />
    </div>
}