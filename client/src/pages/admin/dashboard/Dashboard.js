import React from "react";
import "./dashboard.css";
import Stats from "../../../components/stats/Stats";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="dashboard-stats">
        <Stats title="Projects" amount={2} />
        <Stats title="Tasks" amount={2} />
        <Stats title="Users" amount={2} />
      </div>
    </div>
  );
};

export default Dashboard;
