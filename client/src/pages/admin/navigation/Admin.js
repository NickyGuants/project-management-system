import React from "react";
import "./navigation.css";
import { Link, Outlet } from "react-router-dom";
import Header from "../../../components/header/Header";
import DashboardIcon from "@mui/icons-material/Dashboard";
import TaskIcon from "@mui/icons-material/Task";
import PeopleIcon from "@mui/icons-material/People";
import AssignmentIcon from "@mui/icons-material/Assignment";

const Admin = () => {
  return (
    <div className="box-container">
      <div className="nav">
        <div className="nav-items">
          <div className="nav-item">
            <Link to="/admin/dashboard">
              <DashboardIcon />
              <h2>Dashboard</h2>
            </Link>
          </div>

          <div className="nav-item">
            <Link to="/admin/projects">
              <AssignmentIcon />
              <h2>Projects</h2>
            </Link>
          </div>

          <div className="nav-item">
            <Link to="/admin/tasks">
              <TaskIcon />
              <h2>Tasks</h2>
            </Link>
          </div>
          <div className="nav-item">
            <Link to="/admin/users">
              <PeopleIcon />
              <h2>Users</h2>
            </Link>
          </div>
        </div>
      </div>
      <div className="main-page">
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;
