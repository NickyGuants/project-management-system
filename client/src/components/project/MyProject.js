import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAssignedProject,
  getProjects,
} from "../../redux/actions/projectActions";

const MyProject = () => {
  const assignedProject = useSelector((state) => state.assignedProject);
  const userLogin = useSelector((state) => state.userLogin);
  const { project } = assignedProject;

  //use token to get logged in user
  const { userInfo } = userLogin;
  let user_id = userInfo?.user?.id;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProjects());
    dispatch(getAssignedProject(user_id));
  }, [dispatch, user_id]);

  return (
    <div key={project?.project_id} className="project-card">
      <h1>My Project</h1>
      <h3>{project?.project_name}</h3>
      <p>{project?.project_description}</p>
      <p>Complete Tasks = 13/20</p>
      <p>Due Date: 20 Dec</p>
    </div>
  );
};

export default MyProject;
