import React, { Component } from 'react';

import './SubTaskView.css';
import ItemCheckHolder from './ItemCheckHolder';
import EditComponent from './EditComponent';
import Axios from 'axios';
export default class SubTaskView extends Component {

    toggleDoneStatus = (toggledSubtask) => {
        toggledSubtask.doneStatus = !toggledSubtask.doneStatus;
        let updatedSubtasks = this.props.selectedTask.subTasks.map((subtask) => {
            if (subtask.name === toggledSubtask.name) {
                this.props.onSaveSubtask(toggledSubtask, toggledSubtask.name);
                return toggledSubtask;
            } else {
                return subtask;
            }
        });

        let updatedTask = this.props.selectedTask;
        updatedTask.subTasks = updatedSubtasks;
        //{ updatedTask, newSubTaskName, toggled }
        this.props.updateTask({ updatedTask, newSubTaskName: toggledSubtask.name, toggled: true });
    }

    addNewSubTask = (e) => {
        e.preventDefault();
        let subTaskName = e.target.newSubTaskName.value.trim();
        e.target.newSubTaskName.value = '';
        if (subTaskName.length === 0) return;

        let newSubTask = {
            name: subTaskName,
            doneStatus: false
        }
        let updatedSubtasks = this.props.selectedTask.subTasks;
        updatedSubtasks.push(newSubTask);
        let updatedTask = this.props.selectedTask;
        updatedTask.subTasks = updatedSubtasks;
        this.props.updateTask({ updatedTask, newSubTaskName: subTaskName, toggled: false });

    }

    onDeleteClickHandler = (deltedSubtask) => {
        let deleteUpdatedSubtasks = this.props.selectedTask.subTasks.filter(subtask => subtask.name !== deltedSubtask.name);
        this.props.updateDeletedSubtask({ deleteUpdatedSubtasks, subtasktoDelete: deltedSubtask });
    }
    render() {

        return <div style={{ flexGrow: (this.props.selectedTask) ? '1' : '0' }} className="subTaskView">
            {this.props.selectedTask && this.props.selectedTask.taskName}
            {this.props.selectedTask != null &&
                < ul >
                    {
                        this.props.selectedTask.subTasks.map(subTask => {
                            return <div key={this.props.selectedTask.taskName + subTask.name}>
                                <ItemCheckHolder
                                    toggleDoneStatus={() => this.toggleDoneStatus(subTask)}
                                    onClickHandler={() => { console.log('clicking subtask') }}
                                    checked={subTask.doneStatus}
                                    name={subTask.name}
                                />
                                <EditComponent
                                    // TODO: enable subtask editing functionality
                                    onEditClickHandler={() => console.log('editing subtask')}
                                    onDeleteClickHandler={() => this.onDeleteClickHandler(subTask)}
                                />
                            </div>
                        })
                    }
                </ul>
            }
            {this.props.selectedTask && <form onSubmit={this.addNewSubTask}>
                <input type='text' name="newSubTaskName" />
                <button type="submit">AddSubTask</button>
            </form>}
        </div>
    }


}