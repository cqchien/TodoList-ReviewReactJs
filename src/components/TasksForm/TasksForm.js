import React, { Component } from "react";

class TasksForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskName: "",
      status: "ACTION",
    };
  }

  onChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value,
    });
  };

  onSubmit = (event) => {
    const { taskName, status } = this.state;
    const { addTask } = this.props;

    event.preventDefault();
    addTask(taskName, status);
  };

  render() {
    const { taskName, status } = this.state;
    const { onToggleForm } = this.props;

    return (
      <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
        <div className="panel panel-warning">
          <div className="panel-heading">
            <h3 className="panel-title">Thêm Công Việc</h3>
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
                  Thêm
                </button>
                &nbsp;
                <button onClick={onToggleForm} className="btn btn-danger">
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
