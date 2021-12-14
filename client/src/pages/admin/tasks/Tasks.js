import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TasksStats from "../../../components/stats/TasksStats";
import Task from "../../../components/tasks/Task";
import { getTasks } from "../../../redux/actions/taskActions";
import "./tasks.css";

const Tasks = () => {
  const dispatch = useDispatch();

  const Alltasks = useSelector((state) => state.tasks);
  const { tasks } = Alltasks;

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);
  return (
    <div className="tasks">
      <div className="task-header">
        <h1>Tasks Overview</h1>
        <div className="add-task-button">
          <h3>Create New Task</h3>
        </div>
      </div>
      <div className="stats-cards">
        <TasksStats title="All Tasks" amount={tasks?.length} />
        <TasksStats title="Complete Tasks" amount={5} />
        <TasksStats title="In Progress" amount={3} />
        <TasksStats title="Unassigned" amount={2} />
      </div>
      <div className="tasks-table">
        <table>
          <thead>
            <tr className="table-header">
              <td>
                <h3>Task Id</h3>
              </td>
              <td>
                <h3>Task Name</h3>
              </td>
              <td>
                <h3>Status</h3>
              </td>
              <td>
                <h3>Due Date</h3>
              </td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            <Task />
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Tasks;
