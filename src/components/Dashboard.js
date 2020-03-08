import React, { Component } from 'react';

import './Dashboard.css';
import ListView from './ListView';
import TaskView from './TaskView';
import SubTaskView from './SubTaskView';

import list from '../utility/fakeData';
import Axios from 'axios';
import { config } from '../utility/requestConfig';

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            selectedList: null,
            selectedTask: null,
            selectedSubTask: null
        }
        this.fetchProfile();
    }

    fetchProfile = () => {
        Axios.get('http://localhost:3000/profile', config)
            .then(data => {
                console.log('profile load', data.data);
                let fullList = data.data.lists.map(list => {
                    let listObj = {
                        listName: list.name,
                        id: list.id,
                        isCurrent: list.isCurrent,
                        taskList: []
                    };
                    if (list.isCurrent) {
                        this.setState((prevState, props) => {
                            return { selectedList: listObj };
                        });
                    }
                    return listObj;
                });
                console.log(fullList);
                this.setState((prevState, props) => {
                    return { list: fullList };
                });
                this.getSelectedList(this.state.selectedList);
            }).catch(er => {
                console.log("profile load error", er);
            })
    }
    selectList = (selectedList) => {
        console.log('Selecting List', selectedList);
        // if selected already then unselect it
        if (this.state.selectedList && this.state.selectedList.id === selectedList.id) {

        } else {
            this.setState((prevState, props) => {
                return { selectedList: selectedList, selectedTask: null, selectedSubTask: null };
            })

            this.getSelectedList(selectedList);

        }
    }

    getSelectedList = (selectedList) => {
        Axios.get(`http://localhost:3000/profile/${selectedList.id}`, config)
            .then(data => {
                console.log('fetching selected list ', data.data);
                let taskList = [];
                data.data.tasks.forEach(task => {
                    let newTask = {
                        id: task.id,
                        taskName: task.name,
                        dueDate: task.dueDate,
                        important: task.important,
                        notes: task.notes,
                        taskCompleted: task.completed,
                        subTasks: []
                    }
                    taskList.push(newTask);
                });

                selectedList.taskList = taskList;

                let newUpdatedList = this.state.list.map(singleList => {
                    if (singleList.id === selectedList.id) {
                        return selectedList;
                    } else {
                        return singleList;
                    }
                });

                this.setState((prevState, props) => {
                    return { list: newUpdatedList };
                })
            }).catch(er => {
                console.log('error in fetching the selected list', er);
            })
    }

    selectTask = (task) => {
        console.log('Selecting Task', task.taskName);

        if (this.state.selectedTask && this.state.selectedTask.id === task.id) {
        } else {
            this.setState((prevState, props) => {
                return { selectedTask: task, selectedSubTask: null };
            })
        }

        Axios.get(`http://localhost:3000/profile/${this.state.selectedList.id}/${task.id}`, config)
            .then(response => {
                console.log('response ', response.data.subtasks);
                let newSubtasks = [];
                response.data.subtasks.forEach(subtask => {
                    newSubtasks.push({ name: subtask.name, doneStatus: subtask.completed });
                });
                let newTask = this.state.selectedTask;
                newTask.subTasks = newSubtasks;
                console.log("new Subtasks", newSubtasks);
                console.log("new Task", newTask);

                console.log('old selectedList ', this.state.selectedList);
                let newSelectedList = this.state.selectedList;
                newSelectedList.taskList = newSelectedList.taskList.map(task => {
                    if (task.id === newTask.id) {
                        return newTask;
                    } else {
                        return task;
                    }
                })

                console.log("new Selected List ", newSelectedList);

                let newList = this.state.list.map(singleList => {
                    if (singleList.id === newSelectedList.id) {
                        return newSelectedList;
                    } else {
                        return singleList;
                    }
                });
                console.log("new List ", newList);
                this.setState((prevState, props) => {
                    return { list: newList, selectedList: newSelectedList, selectedTask: newTask };
                })

            }).catch(er => {
                console.log('error fetching task', er);
            })


    }

    selectSubTask = (taskName) => {
        console.log('Selecting SubTask');
    }

    addNewList = (newListName) => {
        if (newListName.length === 0)
            return;
        Axios.post('http://localhost:3000/update/addList', { newListName }, config)
            .then(data => {
                console.log('then addnewList ', data);
                let newList = {
                    listName: newListName,
                    id: data.data,
                    isCurrent: false,
                    taskList: []
                }
                this.state.list.push(newList);
                this.setState((prevState, props) => {
                    return { list: this.state.list }
                });
            }).catch(er => {
                console.log('catch addNewList', er);
            })

    }

    addNewTask = (newTaskName) => {
        console.log(newTaskName);
        if (newTaskName.length === 0) return;

        Axios.post('http://localhost:3000/update/addTask', {
            listId: this.state.selectedList.id,
            newTaskName: newTaskName
        }, config)
            .then(response => {
                console.log("after adding task in the list ", response);
                let newTask = {
                    taskName: newTaskName,
                    id: response.data,
                    taskCompleted: false,
                    dueDate: null,
                    notes: "",
                    subTasks: []
                }

                let updatedTaskList = this.state.selectedList;
                updatedTaskList.taskList.push(newTask);

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
            }).catch(er => {
                console.log("error in adding task in the list ", er);
            });

    }

    deleteList = (singleListName) => {
        let updatedListAfterDeletion = this.state.list.filter(singleList => singleList.listName !== singleListName);
        console.log('dd', updatedListAfterDeletion);
        this.setState((prevState, props) => {
            return { list: updatedListAfterDeletion }
        });
        if (this.state.selectedList && this.state.selectedList.listName === singleListName) {
            this.setState((prevState, props) => {
                return { selectedList: null, selectedTask: null };
            })
        }
    }
    updateTask = ({ updatedTask, newSubTaskName }) => {

        let selectedListUpdated = this.state.selectedList.taskList.map(task => {
            if (task.id === updatedTask.id) {
                return updatedTask;
            } else {
                return task;
            }
        });
        let updatedList = this.state.list.map(taskList => {
            if (taskList.id === selectedListUpdated.id) {
                return selectedListUpdated;
            } else {
                return taskList;
            }
        });
        this.setState({ list: updatedList });
        Axios.post('http://localhost:3000/update/addSubtask', {
            listId: this.state.selectedList.id,
            taskId: this.state.selectedTask.id,
            newSubTaskName
        }, config).then(response => {
            console.log("after addding subtask ", response);
        }).catch(er => {
            console.log('error in adding subtask', er);
        })
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
                    onDeleteList={this.deleteList}
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