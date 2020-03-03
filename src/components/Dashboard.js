import React, { Component } from 'react';

import './Dashboard.css';
import ListView from './ListView';
import TaskView from './TaskView';
import SubTaskView from './SubTaskView';

import list from '../utility/fakeData';

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: list,
            selectedList: null,
            selectedTask: null,
            selectedSubTask: null
        }
    }

    selectList = (taskList) => {
        console.log('Selecting List', taskList);
        // if selected already then unselect it
        if (this.state.selectedList && this.state.selectedList.listName === taskList.listName) {
        } else {
            this.setState((prevState, props) => {
                return { selectedList: taskList, selectedTask: null, selectedSubTask: null };
            })
        }
    }

    selectTask = (task) => {
        console.log('Selecting Task', task.taskName);

        if (this.state.selectedTask && this.state.selectedTask.taskName === task.taskName) {
        } else {
            this.setState((prevState, props) => {
                return { selectedTask: task, selectedSubTask: null };
            })
        }


    }

    selectSubTask = (taskName) => {
        console.log('Selecting SubTask');
    }

    addNewList = (newListName) => {
        if (newListName.length === 0)
            return;
        let newList = {
            listName: newListName,
            taskList: []
        }
        this.state.list.push(newList);
        this.setState((prevState, props) => {
            return { list: this.state.list }
        })
    }

    addNewTask = (newTaskName) => {
        console.log(newTaskName);
        if (newTaskName.length === 0) return;

        let newTask = {
            taskName: newTaskName,
            taskCompleted: false,
            dueDate: null,
            notes: "",
            subTasks: []
        }

        let updatedTaskList = this.state.selectedList;
        updatedTaskList.taskList.push(newTask);
        console.log("updated ", updatedTaskList);

        this.setState((prevState) => {
            return { selectedList: updatedTaskList };
        })
        let updatedList = this.state.list.map(singleList => {
            if (singleList.listName === updatedTaskList.taskName) {
                return updatedTaskList;
            } else {
                return singleList;
            }
        })

        this.setState({ list: updatedList });
    }

    updateTask = (taskList) => {

        let selectedListUpdated = this.state.selectedList.taskList.map(task => {
            if (task.taskName === taskList.taskName) {
                return taskList;
            } else {
                return task;
            }
        });
        let updatedList = this.state.list.map(taskList => {
            if (taskList.listName === selectedListUpdated.listName) {
                return selectedListUpdated;
            } else {
                return taskList;
            }
        });
        this.setState({ list: updatedList });
    }

    updateDeletedTaskList = (updateListAfterDeletion) => {
        console.log('updateListAfterDeletion', updateListAfterDeletion);
        let updatedList = this.state.list.map(taskList => {
            if (taskList.listName === updateListAfterDeletion) {
                return updateListAfterDeletion;
            } else {
                return taskList;
            }
        })
        this.setState((prevState, props) => {
            return {
                list: updatedList
            }
        })
    }
    updateDeletedSubtask = (deleteUpdatedSubtaskList) => {
        let updatedSelectedTask = this.state.selectedTask;
        console.log('dash', updatedSelectedTask);
        updatedSelectedTask.subTasks = deleteUpdatedSubtaskList;
        console.log(updatedSelectedTask.taskName);
        this.updateDeletedTaskList(updatedSelectedTask);
    }
    render() {


        return <>
            <div className="dashboard">
                <ListView
                    list={this.state.list}
                    onListSelect={this.selectList}
                    onAddNewList={this.addNewList} />
                <TaskView
                    selectedList={this.state.selectedList}
                    updateTask={this.updateTask}
                    selectTask={this.selectTask}
                    onAddNewTask={this.addNewTask}
                    updateDeletedTaskList={this.updateDeletedTaskList}
                />
                <SubTaskView
                    selectedTask={this.state.selectedTask}
                    onClick={this.selectedSubTask}
                    updateTask={this.updateTask}
                    updateDeletedSubtask={this.updateDeletedSubtask}
                />
            </div>
        </>
    }
}