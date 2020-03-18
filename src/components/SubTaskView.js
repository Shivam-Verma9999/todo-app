import React, { Component } from 'react';

import './SubTaskView.css';
import ContentHolder from './ContentHolder';
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

        let alreadyExists = false;
        let listOfSubtasks = this.props.selectedTask.subTasks;
        for (let i = 0; i < listOfSubtasks.length; i++) {
            if (listOfSubtasks[i].name === subTaskName) {
                alreadyExists = true;
                break;
            }
        }
        if (alreadyExists) {
            alert(`"${subTaskName}" already exists.`);
            return;
        }
        // TODO: can show anything meaninhg full 

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

    onDeleteClickHandler = (deletedSubtask) => {
        if (!window.confirm(`Delete step "${deletedSubtask.name}"?`)) return;

        let deleteUpdatedSubtasks = this.props.selectedTask.subTasks.filter(subtask => subtask.name !== deletedSubtask.name);
        this.props.updateDeletedSubtask({ deleteUpdatedSubtasks, subtasktoDelete: deletedSubtask });
    }

    editClickHandler = (subtask) => {
        let newSubtaskName = prompt('Enter new Subtask Name', subtask.name);
        if (newSubtaskName === null) return;
        newSubtaskName = newSubtaskName.trim();
        if (newSubtaskName !== subtask.name) {
            this.props.editSubtaskName(subtask, newSubtaskName)
        }
    }
    render() {
        return <div style={{ flexGrow: (this.props.selectedTask) ? '1' : '0' }} className="subTaskView">
            {this.props.selectedTask != null &&
                < ul >
                    {/* <h2>STEPS</h2> */}
                    <h2>{this.props.selectedTask.taskName}</h2>
                    {this.props.selectedTask.subTasks.length === 0 ?
                        "Add steps to your task" :
                        this.props.selectedTask.subTasks.map(subTask => {
                            // return <div className="content flex" key={this.props.selectedTask.taskName + subTask.name}>
                            //     <div className="flex-grow-1">  <ItemCheckHolder
                            //         toggleDoneStatus={() => this.toggleDoneStatus(subTask)}
                            //         onClickHandler={() => { console.log('clicking subtask') }}
                            //         checked={subTask.doneStatus}
                            //         name={subTask.name}
                            //     />
                            //     </div>
                            //     <EditComponent
                            //         onEditClickHandler={() => { this.editClickHandler(subTask) }}
                            //         onDeleteClickHandler={() => this.onDeleteClickHandler(subTask)}
                            //     />
                            // </div>


                            return <ContentHolder
                                key={this.props.selectedTask.id + subTask.name}
                                showCheckBox={true}
                                onToggleDoneStatus={() => this.toggleDoneStatus(subTask)}
                                onClickHandler={() => console.log('clicking subtask')}
                                doneStatus={subTask.doneStatus}
                                textContent={subTask.name}
                                EditComponentEditClickHandler={() => this.editClickHandler(subTask)}
                                EditComponentDeleteClickHandler={() => this.onDeleteClickHandler(subTask)}
                            />
                        })
                    }
                    <form onSubmit={this.addNewSubTask}>
                        <input type='text' name="newSubTaskName" />
                        <button type="submit">Add step</button>
                    </form>
                </ul>
            }

        </div>
    }


}