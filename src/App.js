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
      taskUpdated: {
        id: "",
        taskName: "",
        status: "ACTION",
      },
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
      taskUpdated: {
        id: "",
        taskName: "",
        status: "ACTION",
      },
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

  onUpdateStatus = (task) => {
    const { tasks } = this.state;
    const taskIndex = tasks.findIndex((item) => item.id === task.id);
    if (taskIndex !== -1) {
      task.status === "ACTION"
        ? (tasks[taskIndex].status = "HIDE")
        : (tasks[taskIndex].status = "ACTION");
      this.setState((state) => ({
        tasks: state.tasks,
      }));
    }

    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  removeTask = (task) => {
    const { tasks } = this.state;
    const taskIndex = tasks.findIndex((item) => item.id === task.id);
    if (taskIndex !== -1) {
      tasks.splice(taskIndex, 1);
      this.setState((state) => ({
        tasks: state.tasks,
      }));
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  onUpdateTask = (task) => {
    this.setState({
      taskUpdated: task,
      isDisplayForm: true,
    });
  };

  updateTask = (id, taskName, status) => {
    const { tasks } = this.state;
    const taskIndex = tasks.findIndex((item) => item.id === id);
    if (taskIndex !== -1) {
      const task = {
        id,
        name: taskName,
        status,
      };
      tasks[taskIndex] = task;
      this.setState((state) => ({
        tasks: state.tasks,
        taskUpdated: task,
      }));
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  filter = ({ filterName, filterStatus }) => {
    const tasksALl = JSON.parse(localStorage.getItem("tasks"));
    let tasksFilterName;
    let tasksFilterStatus;

    if (filterName) {
      tasksFilterName = tasksALl.filter((task) => {
        return task.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1;
      });
    } else {
      tasksFilterName = tasksALl;
    }

    if (filterStatus !== "ALL") {
      tasksFilterStatus = tasksALl.filter((task) => {
        return task.status === filterStatus;
      });
    } else {
      tasksFilterStatus = tasksALl;
    }
    const newTasks = tasksFilterName.filter((taskInFilterName) => {
      if (
        tasksFilterStatus.findIndex(
          (taskInFilterStatus) => taskInFilterStatus.id === taskInFilterName.id
        ) !== -1
      ) {
        return true;
      } else return false;
    });
    this.setState({
      tasks: newTasks,
    });
  };

  render() {
    const { isDisplayForm, tasks, taskUpdated } = this.state;
    return (
      <div className="container">
        <div className="text-center">
          <h1 style={{ fontFamily: "fantasy" }}>Quản Lý Công Việc</h1>
          <hr />
        </div>
        <div className="row">
          {isDisplayForm && (
            <TasksForm
              taskUpdated={taskUpdated}
              updateTask={this.updateTask}
              addTask={this.addTask}
              onToggleForm={this.onToggleForm}
            />
          )}
          <TasksTable
            onUpdateTask={this.onUpdateTask}
            removeTask={this.removeTask}
            filter={this.filter}
            onUpdateStatus={this.onUpdateStatus}
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
