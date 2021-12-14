import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./task.css";
import { getTasks } from "../../redux/actions/taskActions";

const Task = () => {
  const dispatch = useDispatch();

  const Alltasks = useSelector((state) => state.tasks);
  const { tasks } = Alltasks;

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  return (
    <>
      {tasks?.map((task) => (
        <tr key={task.task_id} className="table-data">
          <td>{task.task_id}</td>
          <td>{task.task_name}</td>
          <td>{task.is_complete ? "Complete" : "In Progress"}</td>
          <td>12-2-2022</td>
          <td>...</td>
        </tr>
      ))}
    </>
  );
};

export default Task;
