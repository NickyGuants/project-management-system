import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProjects } from "../../../redux/actions/projectActions";
import "./modal.css";

const CreateTaskModal = ({ show, close }) => {
  const dispatch = useDispatch();

  const AllProjects = useSelector((state) => state.projects);
  const { projects } = AllProjects;

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
              <form>
                <div className="select">
                  <label htmlFor="projects">Choose a Project</label>
                  <select name="projects" id="projects">
                    {projects?.map((project) => (
                      <option value={project.project_id}>
                        {project.project_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="task-name">
                  <label htmlFor="task_name">Task Name</label>
                  <input type="text" placeholder="Enter name of the Task" />
                </div>

                <div className="task-description">
                  <label htmlFor="task+description">Task Description</label>
                  <textarea
                    name=""
                    id=""
                    cols="30"
                    rows="10"
                    placeholder="Enter task description"
                  ></textarea>
                </div>
              </form>
            </main>
            <footer className="modal_footer">
              <button className="modal-close" onClick={() => close()}>
                Cancel
              </button>

              <button className="submit">Submit</button>
            </footer>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default CreateTaskModal;
