import React, { Component } from 'react';

import './TaskView.css';
import ContentHolder from './ContentHolder';
import AddForm from './AddForm';

export default class TaskView extends Component {




    addTask = (newTaskName) => {
        this.props.onAddNewTask(newTaskName);
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

    toggleImp = (task) => {
        task.important = !task.important;
        this.props.editTaskName({ oldTask: task, newTaskName: task.taskName });
    }
    render() {
        //console.log("rendering taskView with props", this.props);
        return <div className="taskView">
            {this.props.selectedList === null ?
                "Please select a TODO to View"
                :
                <ul>
                    {/* <h2>TASK</h2> */}
                    <h2>{this.props.selectedList.listName}</h2>
                    {this.props.selectedList.taskList.length === 0 ?
                        "New Task will appear here "
                        :
                        this.props.selectedList.taskList.map(task => {
                            // return <div className="content flex" key={task.id}>
                            //     <div className="flex-grow-1">
                            //         <ItemCheckHolder
                            //             name={task.taskName}
                            //             onClickHandler={() => this.props.selectTask(task)}
                            //             toggleDoneStatus={() => this.toggleDoneStatus(task)}
                            //             checked={task.taskCompleted}
                            //         />
                            //     </div>
                            //     <EditComponent
                            //         onEditClickHandler={() => { this.editClickHandler(task) }}
                            //         onDeleteClickHandler={() => this.deleteTask(task)}
                            //     />

                            // </div>

                            return <ContentHolder
                                key={task.id}
                                textContent={task.taskName}
                                onToggleDoneStatus={() => this.toggleDoneStatus(task)}
                                showCheckBox={true}
                                isImportant={task.important}
                                toggleImp={() => this.toggleImp(task)}
                                dueDate={task.dueDate}
                                onClickHandler={() => this.props.selectTask(task)}
                                doneStatus={task.taskCompleted}
                                EditComponentEditClickHandler={() => this.editClickHandler(task)}
                                EditComponentDeleteClickHandler={() => this.deleteTask(task)}
                            />

                        })
                    }
                    <AddForm onSubmit={this.addTask} />
                </ul>
            }

        </div>
    }
}