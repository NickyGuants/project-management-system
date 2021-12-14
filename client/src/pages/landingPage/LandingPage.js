import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./landing.css";

const LandingPage = () => {
  return (
    <>
      <div className="container">
        <Link to="/login">Sign In</Link>
        <Link to="/register">Sign Up</Link>
      </div>
      <Outlet />
    </>
  );
};

export default LandingPage;
