import React, { Component } from "react";
import TaskSearching from "../TaskSearching/TaskSearching";
import TasksSorting from "../TasksSorting/TasksSorting";

class TasksTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterName: "",
      filterStatus: "ALL",
    };
  }

  onChange = (event) => {
    const { value, name } = event.target;
    const { filter } = this.props;
    filter({
      filterName: name === "filterName" ? value : this.state.filterName,
      filterStatus: name === "filterStatus" ? value : this.state.filterStatus,
    });
    this.setState({
      [name]: value,
    });
  };

  render() {
    const {
      isDisplayForm,
      onToggleForm,
      tasks,
      onUpdateStatus,
      removeTask,
      onUpdateTask,
    } = this.props;

    const { filterName, filterStatus } = this.state;
    return (
      <div
        className={
          isDisplayForm
            ? "col-xs-8 col-sm-8 col-md-8 col-lg-8"
            : "col-xs-12 col-sm-12 col-md-12 col-lg-12"
        }
      >
        {!isDisplayForm && (
          <button
            onClick={onToggleForm}
            type="button"
            className="btn btn-primary"
          >
            <span className="fa fa-plus mr-5" />
            Thêm Công Việc
          </button>
        )}

        <div className="row mt-15">
          <TaskSearching />
          <TasksSorting />
        </div>
        <div className="row mt-15">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <table className="table table-bordered table-hover">
              <thead>
                <tr>
                  <th className="text-center">STT</th>
                  <th className="text-center">Tên</th>
                  <th className="text-center">Trạng Thái</th>
                  <th className="text-center">Hành Động</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td></td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      name="filterName"
                      value={filterName}
                      onChange={this.onChange}
                    />
                  </td>
                  <td>
                    <select
                      className="form-control"
                      name="filterStatus"
                      value={filterStatus}
                      onChange={this.onChange}
                    >
                      <option value="ALL">Tất Cả</option>
                      <option value="HIDE">Ẩn</option>
                      <option value="ACTION">Kích Hoạt</option>
                    </select>
                  </td>
                  <td />
                </tr>
                {tasks.map((task, index) => {
                  return (
                    <tr key={task.id}>
                      <td>{index + 1}</td>
                      <td>{task.name}</td>
                      <td className="text-center">
                        <button
                          className={
                            task.status === "ACTION"
                              ? "btn btn-sm btn-success"
                              : "btn btn-sm btn-warning"
                          }
                          onClick={() => onUpdateStatus(task)}
                        >
                          {task.status === "ACTION" ? "Kich Hoat" : "An"}
                        </button>
                      </td>
                      <td className="text-center">
                        <button
                          type="button"
                          className="btn btn-warning"
                          onClick={() => onUpdateTask(task)}
                        >
                          <span className="fa fa-pencil mr-5" />
                          Sửa
                        </button>
                        &nbsp;
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => removeTask(task)}
                        >
                          <span className="fa fa-trash mr-5" />
                          Xóa
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default TasksTable;
