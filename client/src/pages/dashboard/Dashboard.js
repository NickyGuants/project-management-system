import React from "react";
import "./dashboard.css";
import MyProject from "../../components/project/MyProject";
import Task from "../../components/task/Task";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <MyProject />
      <Task />
    </div>
  );
};

export default Dashboard;
