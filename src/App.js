import "./App.css";
import React, { Component } from "react";
import TasksForm from "./components/TasksForm/TasksForm";
import TasksTable from "./components/TasksTable/TasksTable";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      isDisplayForm: false,
    };
  }

  componentDidMount() {
    const tasksInLocalStorage = localStorage.getItem("tasks");
    const tasks = JSON.parse(tasksInLocalStorage);
    if (tasks) {
      this.setState({
        tasks,
      });
    }
  }

  onToggleForm = () => {
    this.setState((state) => ({
      isDisplayForm: !state.isDisplayForm,
    }));
  };

  addTask = (taskName, status) => {
    const task = {
      id: this.getId(),
      name: taskName,
      status,
    };
    const { tasks } = this.state;
    const newTasks = tasks;
    newTasks.push(task);

    this.setState({
      tasks: newTasks,
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  getId() {
    return Math.floor((1 + Math.random()) * 0x10001).toString(16);
  }

  render() {
    const { isDisplayForm, tasks } = this.state;
    return (
      <div className="container">
        <div className="text-center">
          <h1 style={{ fontFamily: "fantasy" }}>Quản Lý Công Việc</h1>
          <hr />
        </div>
        <div className="row">
          {isDisplayForm && (
            <TasksForm
              addTask={this.addTask}
              onToggleForm={this.onToggleForm}
            />
          )}
          <TasksTable
            tasks={tasks}
            isDisplayForm={isDisplayForm}
            onToggleForm={this.onToggleForm}
          />
        </div>
      </div>
    );
  }
}

export default App;
