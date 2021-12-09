import React from "react";
import "./admin.css";
import { Link, Outlet } from "react-router-dom";
import Navigation from "../navigation/Navigation";

const Admin = () => {
  return (
    <div className="container">
      <Navigation />
      <div className="main">
        <nav>
          <h1>Admin Panel</h1>
          <Link to="/admin/projects">
            <h2>Projects</h2>
          </Link>
          <Link to="/admin/tasks">
            <h2>Tasks</h2>
          </Link>
          <Link to="/admin/users">
            <h2>Users</h2>
          </Link>
        </nav>
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;
