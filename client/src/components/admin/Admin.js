import React from "react";
import { Link, Outlet } from "react-router-dom";

const Admin = () => {
  return (
    <div>
      <h1>Admin panel</h1>
      <nav>
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
  );
};

export default Admin;
