import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Stats from "../../../components/stats/Stats";
import CreateProjectModal from "./CreateProjectModal";
import "./projects.css";
import TablePagination from "@mui/material/TablePagination";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { getProjects } from "../../../redux/actions/projectActions";

const Projects = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

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

  const AllProjects = useSelector((state) => state.projects);
  const { projects } = AllProjects;

  const completeProjects = projects?.filter(
    (project) => project.is_complete === true
  );

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch, modal]);
  return (
    <div className="projects">
      <div className="project-header">
        <h1>Projects Overview</h1>
        <div className="add-project-button" onClick={() => Toggle()}>
          <AddIcon />
          <h3>Create Project</h3>
        </div>
        <CreateProjectModal show={modal} close={Toggle} />
      </div>
      <div className="stats-cards">
        <Stats title="All Projects" amount={projects?.length} />
        <Stats title="Complete Projects" amount={completeProjects?.length} />
        <Stats
          title="In Progress"
          amount={projects?.length - completeProjects?.length}
        />
        <Stats title="Unassigned" amount={2} />
      </div>
      <div className="projects-table">
        <table>
          <thead>
            <tr className="project-table-header">
              <td>
                <h3>Project Id</h3>
              </td>
              <td>
                <h3>Project Name</h3>
              </td>
              <td>
                <h3>Progress</h3>
              </td>
              <td>
                <h3>Due Date</h3>
              </td>
              <td>
                <h3>Assignee</h3>
              </td>
              <td>
                <h3>Delete</h3>
              </td>
            </tr>
          </thead>
          <tbody>
            {projects
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((project) => (
                <tr key={project.project_id} className="project-row">
                  <td>{project.project_id}</td>
                  <td id="name">{project.project_name}</td>
                  <td>{project.is_complete ? "Complete" : `In Progress`}</td>
                  <td>{project.due_date}</td>
                  <td>Assignee</td>
                  <td>
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
          count={projects?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </div>
  );
};

export default Projects;
