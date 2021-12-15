import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProjects } from "../../../redux/actions/projectActions";
import { addTask } from "../../../redux/actions/taskActions";
import "./modal.css";

const CreateTaskModal = ({ show, close }) => {
  const [task_name, setTaskName] = useState("");
  const [task_description, setDescription] = useState("");
  const [due_date, setDueDate] = useState("");
  const [project_id, setProjectId] = useState("");

  const dispatch = useDispatch();

  const AllProjects = useSelector((state) => state.projects);
  const { projects } = AllProjects;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTask(task_name, task_description, due_date, project_id));
    close();
  };

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  return (
    <>
      {show ? (
        <div className="modalContainer">
          <div className="modal">
            <header className="modal-header">
              <h2> Create A New Task </h2>
            </header>
            <main className="modal_content">
              <form onSubmit={handleSubmit}>
                <div className="select">
                  <label htmlFor="projects">Choose a Project</label>
                  <select
                    name="projects"
                    id="projects"
                    onChange={(e) => setProjectId(e.target.value)}
                  >
                    <option value="" selected>
                      Choose Project
                    </option>
                    {projects?.map((project) => (
                      <option value={project.project_id}>
                        {project.project_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="task-name">
                  <label htmlFor="task_name">Task Name</label>
                  <input
                    type="text"
                    placeholder="Enter name of the Task"
                    value={task_name}
                    onChange={(e) => setTaskName(e.target.value)}
                  />
                </div>

                <div className="task-description">
                  <label htmlFor="task+description">Task Description</label>
                  <textarea
                    name="task_description"
                    value={task_description}
                    id=""
                    cols="30"
                    rows="10"
                    placeholder="Enter task description"
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
                <div className="due-date">
                  <label htmlFor="due_date">Due Date</label>
                  <input
                    type="Date"
                    value={due_date}
                    onChange={(e) => setDueDate(e.target.value)}
                  />
                </div>
                <footer className="modal_footer">
                  <button className="modal-close" onClick={() => close()}>
                    Cancel
                  </button>

                  <button className="submit" type="submit">
                    Submit
                  </button>
                </footer>
              </form>
            </main>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default CreateTaskModal;
