import React, { Component } from 'react';

import './TaskView.css';
import ItemCheckHolder from './ItemCheckHolder';
import EditComponent from './EditComponent';

export default class TaskView extends Component {

    constructor(props) {
        super(props);
    }

    addTask = (e) => {
        e.preventDefault();
        let newTask = e.target.newTaskName.value.trim();
        if (newTask.length !== 0) {
            this.props.onAddNewTask(newTask);
        }
        e.target.newTaskName.value = '';
    }


    toggleDoneStatus = (task) => {
        task.taskCompleted = !task.taskCompleted;
        this.props.updateTask(task);
    }

    deleteTask = (taskToDelete) => {
        let updatedTaskList = this.props.selectedList.taskList.filter(task => task.taskName !== taskToDelete.taskName);
        console.log('updatedTaskList TaskView', updatedTaskList);
        let updatedList = this.props.selectedList;
        updatedList.taskList = updatedTaskList;
        this.props.updateDeletedTaskList(updatedList);
    }
    render() {
        console.log("rendering taskView with props", this.props);
        return <div className="taskView">
            {this.props.selectedList && this.props.selectedList.listName}
            {this.props.selectedList === null ?
                "Please select list to View"
                :
                <ul>
                    {
                        this.props.selectedList.taskList.map(task => {
                            return <div key={this.props.selectedList.listName + task.taskName}>
                                <ItemCheckHolder
                                    name={task.taskName}
                                    onClickHandler={() => this.props.selectTask(task)}
                                    toggleDoneStatus={() => this.toggleDoneStatus(task)}
                                    checked={task.taskCompleted}
                                />
                                <EditComponent
                                    onEditClickHandler={() => { console.log('click edit', task.taskName) }}
                                    onDeleteClickHandler={() => this.deleteTask(task)}
                                />
                            </div>
                        })
                    }
                </ul>
            }
            <form onSubmit={this.addTask}>
                <input type='text' name="newTaskName" />
                <button type="submit" >AddNewList</button>
            </form>
        </div>
    }
}