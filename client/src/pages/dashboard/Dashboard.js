import React from "react";
import "./dashboard.css";
import MyProject from "../../components/project/MyProject";
import Task from "../../components/task/Task";
import Navigation from "../../components/navigation/Navigation";
import Header from "../../components/header/Header";

const Dashboard = () => {
  return (
    <div className="container">
      <Navigation />
      <div className="dashboard">
        <Header />
        <div className="main">
          <MyProject />
          <Task />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
