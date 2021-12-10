import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/header/Header";

const LandingPage = () => {
  return (
    <div>
      <Header />
      <h1>Welcome to PMS</h1>
      <Outlet />
    </div>
  );
};

export default LandingPage;
