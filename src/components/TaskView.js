import React, { Component } from 'react';

import './TaskView.css';
import ItemCheckHolder from './ItemCheckHolder';
import EditComponent from './EditComponent';

export default class TaskView extends Component {




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
        //{ updatedTask, newSubTaskName, toggled }
        this.props.updateTask({ updatedTask: task, toggled: true });
    }

    deleteTask = (taskToDelete) => {
        if (!window.confirm(`Delete task "${taskToDelete.taskName}"?`)) return;

        let updatedTaskList = this.props.selectedList.taskList.filter(task => task.id !== taskToDelete.id);
        //console.log('updatedTaskList TaskView', updatedTaskList);
        let updatedListAfterDeletion = this.props.selectedList;
        updatedListAfterDeletion.taskList = updatedTaskList;
        this.props.updateDeletedTaskList({ updatedListAfterDeletion, taskToDelete });
    }

    editClickHandler = (task) => {
        //console.log('editing task name ', task);
        let editedTaskName = prompt('Enter task name', task.taskName);
        if (editedTaskName === null) return;
        editedTaskName = editedTaskName.trim();

        if (editedTaskName !== task.taskName) {
            this.props.editTaskName({ oldTask: task, newTaskName: editedTaskName });
        }
    }
    render() {
        //console.log("rendering taskView with props", this.props);
        return <div className="taskView">
            {this.props.selectedList === null ?
                "Please select list to View"
                :
                <ul>
                    <h2>TASK</h2>
                    <h3>{this.props.selectedList.listName}</h3>
                    {
                        this.props.selectedList.taskList.map(task => {
                            return <div className="content" key={task.id}>
                                <ItemCheckHolder
                                    name={task.taskName}
                                    onClickHandler={() => this.props.selectTask(task)}
                                    toggleDoneStatus={() => this.toggleDoneStatus(task)}
                                    checked={task.taskCompleted}
                                />
                                <EditComponent
                                    onEditClickHandler={() => { this.editClickHandler(task) }}
                                    onDeleteClickHandler={() => this.deleteTask(task)}
                                />
                                {/* <div className="liner"></div> */}
                            </div>
                        })
                    }
                    <form onSubmit={this.addTask}>
                        <input type='text' name="newTaskName" />
                        <button type="submit" >New Task</button>
                    </form>
                </ul>
            }

        </div>
    }
}