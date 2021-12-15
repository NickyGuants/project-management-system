import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TasksStats from "../../../components/stats/TasksStats";
import Task from "../../../components/tasks/Task";
import CreateTaskModal from "./CreateTaskModal";
import { getTasks } from "../../../redux/actions/taskActions";
import "./tasks.css";

const Tasks = () => {
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
          <h3>Create New Task</h3>
        </div>
        <CreateTaskModal show={modal} close={Toggle} />
      </div>
      <div className="stats-cards">
        <TasksStats title="All Tasks" amount={tasks?.length} />
        <TasksStats title="Complete Tasks" amount={completeTasks?.length} />
        <TasksStats
          title="In Progress"
          amount={tasks?.length - completeTasks?.length}
        />
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
