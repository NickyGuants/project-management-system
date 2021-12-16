import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Stats from "../../../components/stats/Stats";
import CreateTaskModal from "./CreateTaskModal";
import { getTasks } from "../../../redux/actions/taskActions";
import "./tasks.css";
import TablePagination from "@mui/material/TablePagination";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

const Tasks = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const dispatch = useDispatch();

  const [modal, setModal] = useState(false);
  const Toggle = () => setModal(!modal);

  const Alltasks = useSelector((state) => state.tasks);
  const { tasks } = Alltasks;

  const completeTasks = tasks?.filter((task) => task.is_complete === true);

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch, modal]);
  return (
    <div className="tasks">
      <div className="task-header">
        <h1>Tasks Overview</h1>
        <div className="add-task-button" onClick={() => Toggle()}>
          <AddIcon />
          <h3>Create Task</h3>
        </div>
        <CreateTaskModal show={modal} close={Toggle} />
      </div>
      <div className="stats-cards">
        <Stats title="All Tasks" amount={tasks?.length} />
        <Stats title="Complete Tasks" amount={completeTasks?.length} />
        <Stats
          title="In Progress"
          amount={tasks?.length - completeTasks?.length}
        />
        <Stats title="Unassigned" amount={2} />
      </div>
      <div className="tasks-table">
        <table>
          <thead>
            <tr className="table-header">
              <td id="taskId">
                <h3>Task Id</h3>
              </td>
              <td id="name">
                <h3>Task Name</h3>
              </td>
              <td id="status">
                <h3>Status</h3>
              </td>
              <td id="due-date">
                <h3>Due Date</h3>
              </td>
              <td id="assignee">
                <h3>Assignee</h3>
              </td>
              <td id="delete">
                <h3>Delete</h3>
              </td>
            </tr>
          </thead>
          <tbody>
            {tasks
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((task) => (
                <tr key={task.task_id} className="table-data">
                  <td id="task-id">{task.task_id}</td>
                  <td>{task.task_name}</td>
                  <td id="status">
                    {task.is_complete ? "Complete" : "In Progress"}
                  </td>
                  <td id="date">{task.due_date}</td>
                  <td id="assignee">Assignee</td>
                  <td id="delete-icon">
                    <DeleteIcon />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <TablePagination
          className="pagination"
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={tasks?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </div>
  );
};

export default Tasks;
