import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/header/Header";

const LandingPage = () => {
  return (
    <div>
      <Header />

      <Outlet />
    </div>
  );
};

export default LandingPage;
