import React from "react";
import "./stats.css";

const TasksStats = (props) => {
  return (
    <div className="stats-card">
      <div className="stats">
        <h4>{props.title}</h4>
        <h1>{props.amount}</h1>
      </div>
    </div>
  );
};

export default TasksStats;
