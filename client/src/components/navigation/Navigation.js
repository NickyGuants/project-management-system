import React from "react";
import "./navigation.css";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="nav">
      <div className="nav-items">
        <div>
          <Link to="/dashboard">
            <h2>Dashboard</h2>
          </Link>
        </div>

        <div>
          <Link to="/admin">
            <h2>Admin Panel</h2>
          </Link>
        </div>

        <div>
          <Link to="/settings">
            <h2>Settings</h2>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
