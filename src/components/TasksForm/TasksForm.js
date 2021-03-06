import React, { Component } from "react";

class TasksForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      taskName: "",
      status: "ACTION",
    };
  }

  componentDidMount() {
    const { taskUpdated } = this.props;

    if (this.state.id || taskUpdated.id) {
      this.setState({
        id: taskUpdated.id,
        taskName: taskUpdated.name,
        status: taskUpdated.status,
      });
    }
  }

  componentDidUpdate() {
    const { taskUpdated } = this.props;
    if (this.state.id !== taskUpdated.id) {
      this.setState({
        id: taskUpdated.id,
        taskName: taskUpdated.name,
        status: taskUpdated.status,
      });
    }
  }

  onChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value,
    });
  };

  onSubmit = (event) => {
    const { taskName, status, id } = this.state;
    const { addTask, taskUpdated, updateTask } = this.props;

    event.preventDefault();
    taskUpdated.id
      ? updateTask(id, taskName, status)
      : addTask(taskName, status);

    this.setState({
      id: "",
      taskName: "",
      status: "ACTION",
    });
  };

  onCloseForm = (event) => {
    event.preventDefault();

    this.setState({
      id: "",
      taskName: "",
      status: "ACTION",
    });

    this.props.onToggleForm();
  };

  render() {
    const { taskName, status, id } = this.state;
    return (
      <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
        <div className="panel panel-warning">
          <div className="panel-heading">
            <h3 className="panel-title">
              {!id ? "Them Cong Viec" : "Cap Nhat Cong Viec"}
            </h3>
          </div>
          <div className="panel-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label>Tên :</label>
                <input
                  type="text"
                  className="form-control"
                  name="taskName"
                  value={taskName}
                  onChange={this.onChange}
                />
              </div>
              <label>Trạng Thái :</label>
              <select
                className="form-control"
                required="required"
                name="status"
                value={status}
                onChange={this.onChange}
              >
                <option value={"ACTION"}>Kích Hoạt</option>
                <option value={"HIDE"}>Ẩn</option>
              </select>
              <br />
              <div className="text-center">
                <button type="submit" className="btn btn-warning">
                  {!id ? "Them" : "Cap Nhat"}
                </button>
                &nbsp;
                <button onClick={this.onCloseForm} className="btn btn-danger">
                  Hủy Bỏ
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default TasksForm;
