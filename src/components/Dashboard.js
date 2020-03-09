import React, { Component } from 'react';

import './Dashboard.css';
import ListView from './ListView';
import TaskView from './TaskView';
import SubTaskView from './SubTaskView';

import Axios from 'axios';
import { config, API_URL } from '../utility/Config';

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

    moveToLoginIfUnauthorized = (er) => {
        if (er.response.status === 401) {
            document.cookie = 'loggedIn=false';
            window.location.reload();
        }
    }
    fetchProfile = () => {
        Axios.get(`${API_URL}/profile`, config)
            .then(data => {
                // console.log('profile load', data.data);
                let count = 0;
                let fullList = data.data.lists.map(list => {
                    let listObj = {
                        listName: list.name,
                        id: list.id,
                        isCurrent: list.isCurrent,
                        taskList: []
                    };
                    if (count === 0) {
                        this.setState((prevState, props) => {
                            return { selectedList: listObj };
                        });
                        count++;
                    }
                    if (list.isCurrent) {
                        this.setState((prevState, props) => {
                            return { selectedList: listObj };
                        });
                    }
                    return listObj;
                });
                // console.log(fullList);
                this.setState((prevState, props) => {
                    return { list: fullList };
                });
                this.getSelectedList(this.state.selectedList);
            }).catch(er => {
                //console.log("profile load error", er);
                this.moveToLoginIfUnauthorized(er);
            })
    }
    selectList = (selectedList) => {
        //console.log('Selecting List', selectedList);
        // if selected already then unselect it
        if (this.state.selectedList && this.state.selectedList.id === selectedList.id) {

        } else {
            this.setState((prevState, props) => {
                return { selectedList: selectedList, selectedTask: null, selectedSubTask: null };
            })

            this.getSelectedList(selectedList);

        }
    }

    // request selected list data from server 
    getSelectedList = (selectedList) => {
        Axios.get(`${API_URL}/profile/${selectedList.id}`, config)
            .then(data => {
                //console.log('fetching selected list ', data.data);
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
                //console.log('error in fetching the selected list', er);
                this.moveToLoginIfUnauthorized(er);
            })
    }

    selectTask = (task) => {
        //console.log('Selecting Task', task.taskName);

        if (this.state.selectedTask && this.state.selectedTask.id === task.id) {
        } else {
            this.setState((prevState, props) => {
                return { selectedTask: task, selectedSubTask: null };
            })
        }

        Axios.get(`${API_URL}/profile/${this.state.selectedList.id}/${task.id}`, config)
            .then(response => {
                //console.log('response ', response.data.subtasks);
                let newSubtasks = [];
                response.data.subtasks.forEach(subtask => {
                    newSubtasks.push({ name: subtask.name, doneStatus: subtask.completed });
                });
                let newTask = this.state.selectedTask;
                newTask.subTasks = newSubtasks;
                //console.log("new Subtasks", newSubtasks);
                //console.log("new Task", newTask);

                //console.log('old selectedList ', this.state.selectedList);
                let newSelectedList = this.state.selectedList;
                newSelectedList.taskList = newSelectedList.taskList.map(task => {
                    if (task.id === newTask.id) {
                        return newTask;
                    } else {
                        return task;
                    }
                })

                //console.log("new Selected List ", newSelectedList);

                let newList = this.state.list.map(singleList => {
                    if (singleList.id === newSelectedList.id) {
                        return newSelectedList;
                    } else {
                        return singleList;
                    }
                });
                //console.log("new List ", newList);
                this.setState((prevState, props) => {
                    return { list: newList, selectedList: newSelectedList, selectedTask: newTask };
                })

            }).catch(er => {
                //console.log('error fetching task', er);
                this.moveToLoginIfUnauthorized(er);
            })


    }

    selectSubTask = (taskName) => {
        //console.log('Selecting SubTask');
    }

    addNewList = (newListName) => {
        if (newListName.length === 0)
            return;
        Axios.post(`${API_URL}/update/addList`, { newListName }, config)
            .then(data => {
                //console.log('then addnewList ', data);
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
                //console.log('catch addNewList', er);
                this.moveToLoginIfUnauthorized(er);
            })

    }

    addNewTask = (newTaskName) => {
        //console.log(newTaskName);
        if (newTaskName.length === 0) return;

        Axios.post(`${API_URL}/update/addTask`, {
            listId: this.state.selectedList.id,
            newTaskName: newTaskName
        }, config)
            .then(response => {
                //console.log("after adding task in the list ", response);
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
                //console.log("error in adding task in the list ", er);
                this.moveToLoginIfUnauthorized(er);
            });

    }

    deleteList = (singleListToDelete) => {
        let updatedListAfterDeletion = this.state.list.filter(singleList => singleList.id !== singleListToDelete.id);
        //console.log('dd', updatedListAfterDeletion);
        this.setState((prevState, props) => {
            return { list: updatedListAfterDeletion }
        });
        if (this.state.selectedList && this.state.selectedList.id === singleListToDelete.id) {
            this.setState((prevState, props) => {
                return { selectedList: null, selectedTask: null };
            })
        }

        Axios.post(`${API_URL}/delete/deleteList`, {
            listId: singleListToDelete.id
        }, config).then(response => {
            //console.log('after deleting list', response);
        }).catch(er => {
            //console.log("error in deleting list", er);
            this.moveToLoginIfUnauthorized(er);
        })
    }
    // adding new taskName in the list 
    updateTask = ({ updatedTask, newSubTaskName, toggled }) => {

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

        if (toggled === false) {
            Axios.post(`${API_URL}/update/addSubtask`, {
                listId: this.state.selectedList.id,
                taskId: this.state.selectedTask.id,
                subtaskName: newSubTaskName
            }, config).then(response => {
                //console.log("after addding subtask ", response);
            }).catch(er => {
                //console.log('error in adding subtask', er);
                this.moveToLoginIfUnauthorized(er);
            })
        } else if (toggled === true) {
            //console.log("data for toggling task", updatedTask);
            Axios.post(`${API_URL}/update/updateTask`, {
                listId: this.state.selectedList.id,
                taskId: updatedTask.id,
                taskName: updatedTask.taskName,
                taskCompletedStatus: updatedTask.taskCompleted,
                taskImportantStatus: updatedTask.important,
                taskNotes: updatedTask.notes,
                taskDueDate: updatedTask.dueDate
            }, config)
                .then(response => {
                    //console.log('after updating toggle status', response);
                })
                .catch(er => {
                    //console.log('error in updating toggle status of task ', er);
                    this.moveToLoginIfUnauthorized(er);
                });
        }
    }


    //updating deleted task in the state and making delete request to server
    updateDeletedTaskList = ({ updatedListAfterDeletion, taskToDelete }) => {
        //console.log('updateListAfterDeletion', updatedListAfterDeletion);
        let updatedList = this.state.list.map(taskList => {
            if (taskList.id === updatedListAfterDeletion.id) {
                return updatedListAfterDeletion;
            } else {
                return taskList;
            }
        })
        this.setState((prevState, props) => {
            return {
                list: updatedList
            }
        });

        if (taskToDelete) {
            if (this.state.selectedTask && taskToDelete.id === this.state.selectedTask.id) {
                this.setState((prevState, props) => {
                    return { selectedTask: null }
                });
            };
            Axios.post(`${API_URL}/delete/deleteTask`, {
                listId: this.state.selectedList.id,
                taskId: taskToDelete.id
            }, config).then(response => {
                //console.log('deleted task response ', response);

            }).catch(er => {
                //console.log('error in deleting task', er);
                this.moveToLoginIfUnauthorized(er);

            })
        }
    }
    //deleting subtask from the state and making delete request for that subtask to the server
    updateDeletedSubtask = ({ deleteUpdatedSubtasks, subtasktoDelete }) => {
        Axios.post(`${API_URL}/delete/deleteSubtask`, {
            listId: this.state.selectedList.id,
            taskId: this.state.selectedTask.id,
            subtaskName: subtasktoDelete.name
        }, config).then(response => {
            //console.log('after deleting subtask', response);
            let updatedSelectedTask = this.state.selectedTask;
            //console.log('dash', updatedSelectedTask);
            updatedSelectedTask.subTasks = deleteUpdatedSubtasks;
            //console.log(updatedSelectedTask.taskName);
            this.updateDeletedTaskList({ updatedListAfterDeletion: updatedSelectedTask });
        }).catch(er => {
            //console.log('error in deleting subtask', er);
            this.moveToLoginIfUnauthorized(er);
        })
    }
    saveSubtask = (oldSubtask, newSubtaskName) => {
        //console.log("to network request ", oldSubtask, newSubtaskName);
        Axios.post(`${API_URL}/update/updateSubtask`, {
            listId: this.state.selectedList.id,
            taskId: this.state.selectedTask.id,
            subtaskName: oldSubtask.name,
            newSubtaskName: newSubtaskName,
            subtaskCompletedStatus: oldSubtask.doneStatus
        }, config)
            .then(response => {
                //console.log('updated Subtask', response);
            }).catch(er => {
                //console.log('error in updating subtask', er);
                this.moveToLoginIfUnauthorized(er);
            })
    }

    editListName = ({ oldSingleList, newListName }) => {
        Axios.post(`${API_URL}/update/updateList`, {
            listId: oldSingleList.id,
            newListName: newListName
        }, config).then(response => {
            //console.log('response after editing listName', response);
            let list = this.state.list;
            for (let i = 0; i < list.length; i++) {
                if (list[i].id === oldSingleList.id) {
                    list[i].listName = newListName;
                    break;
                }
            }
            this.setState((prevState, props) => {
                return { list };
            });

        }).catch(er => {
            //console.log('error in editing list Name', er);
            this.moveToLoginIfUnauthorized(er);
        });
    }

    editTaskName = ({ oldTask, newTaskName }) => {
        // requirements -> for searching => listId, taskId 
        //				   new data => taskName, taskCompletedStatus, taskImportantStatus, taskNotes, taskDueDate
        Axios.post(`${API_URL}/update/updateTask`, {
            listId: this.state.selectedList.id,
            taskId: oldTask.id,
            taskName: newTaskName,
            taskCompletedStatus: oldTask.taskCompleted,
            taskImportantStatus: oldTask.important,
            taskNotes: oldTask.notes,
            taskDueDate: oldTask.dueDate
        }, config).then(response => {
            //console.log('after editing taskName', response);
            let selectedList = this.state.selectedList;
            for (let i = 0; i < selectedList.taskList.length; i++) {
                if (selectedList.taskList[i].id === oldTask.id) {
                    selectedList.taskList[i].taskName = newTaskName;
                    break;
                }
            }

            this.setState((prevState, props) => {
                return { selectedList };
            });
        }).catch(er => {
            //console.log('error in editing taskName', er);
            this.moveToLoginIfUnauthorized(er);
        });
    }
    editSubtaskName = (subtask, newSubtaskName) => {
        const shouldSendSubtask = { ...subtask };
        let updatedSubtask = this.state.selectedTask.subTasks;
        for (let i = 0; i < updatedSubtask.length; i++) {
            if (updatedSubtask[i].name === subtask.name) {
                //console.log('something happened in break', subtask, newSubtaskName);
                updatedSubtask[i].name = newSubtaskName;
                break;
            }
        }
        let updatedTask = this.state.selectedTask;
        updatedTask.subTasks = updatedSubtask;

        this.saveSubtask(shouldSendSubtask, newSubtaskName);
        this.setState((prevState, props) => {
            return { selectedTask: updatedTask };
        })
    }
    render() {
        return <>
            <div className="dashboard">
                <ListView
                    list={this.state.list}
                    onListSelect={this.selectList}
                    onDeleteList={this.deleteList}
                    onAddNewList={this.addNewList}
                    editListName={this.editListName}
                />
                <TaskView
                    selectedList={this.state.selectedList}
                    updateTask={this.updateTask}
                    selectTask={this.selectTask}
                    onAddNewTask={this.addNewTask}
                    updateDeletedTaskList={this.updateDeletedTaskList}
                    editTaskName={this.editTaskName}
                />
                <SubTaskView
                    selectedTask={this.state.selectedTask}
                    onClick={this.selectedSubTask}
                    updateTask={this.updateTask}
                    onSaveSubtask={this.saveSubtask}
                    editSubtaskName={this.editSubtaskName}
                    updateDeletedSubtask={this.updateDeletedSubtask}
                />
            </div>
        </>
    }
}