import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProject } from "../../../redux/actions/projectActions";
import "./modal.css";

const CreateProjectModal = ({ show, close }) => {
  const [project_name, setProjectName] = useState("");
  const [project_description, setDescription] = useState("");
  const [due_date, setDueDate] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addProject(project_name, project_description, due_date));
    close();
  };

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
                <div className="project-name">
                  <label htmlFor="task_name">Project Name</label>
                  <input
                    type="text"
                    placeholder="Enter name of the Project"
                    value={project_name}
                    onChange={(e) => setProjectName(e.target.value)}
                  />
                </div>

                <div className="project-description">
                  <label htmlFor="project_description">Task Description</label>
                  <textarea
                    name="project_description"
                    value={project_description}
                    id=""
                    cols="30"
                    rows="10"
                    placeholder="Enter Project description"
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

export default CreateProjectModal;
