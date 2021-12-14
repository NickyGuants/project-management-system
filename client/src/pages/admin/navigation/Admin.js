import React from "react";
import "./navigation.css";
import { Link, Outlet } from "react-router-dom";

const Admin = () => {
  return (
    <div className="box-container">
      <div className="nav">
        <div className="nav-items">
          <div className="nav-item">
            <Link to="/admin/dashboard">
              <h2>Dashboard</h2>
            </Link>
          </div>

          <div className="nav-item">
            <Link to="/admin/projects">
              <h2>Projects</h2>
            </Link>
          </div>

          <div className="nav-item">
            <Link to="/admin/tasks">
              <h2>Tasks</h2>
            </Link>
          </div>
          <div className="nav-item">
            <Link to="/admin/users">
              <h2>Users</h2>
            </Link>
          </div>
        </div>
      </div>
      <Outlet className="main" />
    </div>
  );
};

export default Admin;
