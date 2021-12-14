const sql = require("mssql");
const express = require("express");
const config = require("./config/db");
const projectRoutes = require("./routes/projectRouters");
const taskRoutes = require("./routes/taskRoutes");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

sql
  .connect(config)
  .then((pool) => {
    if (pool.connected) {
      console.log("connected to the msssql database");
    }
  })
  .catch((e) => console.log(e));

app.use("/projects", projectRoutes);
app.use("/tasks", taskRoutes);

app.listen(8000);
