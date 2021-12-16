const sql = require("mssql");
require("dotenv").config();
const moment = require("moment");

const config = require("../config/db");

exports.getProjects = async (req, res) => {
  try {
    //let query = `select * from projects`;
    let pool = await sql.connect(config);

    pool.request().execute("getAllProjects", (err, results) => {
      if (err) {
        console.log(err);
        return res
          .status(400)
          .send({ message: "Oh, sorry, we appear to have a server error." });
      }
      if (results.recordset.length === 0) {
        return res.status(406).send("No projects in the database");
      }
      return res.status(201).send(
        results.recordset.map((project) => {
          return {
            ...project,
            due_date: moment(project.due_date).format("DD/MM/YYYY"),
          };
        })
      );
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getSingleProject = async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    //let query = `select * from projects where project_id=${id}`;
    let pool = await sql.connect(config);

    pool
      .request()
      .input("id", sql.Int, id)
      .execute("getSingleProject", (err, results) => {
        if (err) {
          console.log(err);
          return res
            .status(400)
            .send({ message: "Oh, sorry, we appear to have a server error." });
        }
        if (results.recordset.length === 0) {
          return res
            .status(406)
            .send({ message: "No project with that id in the database." });
        }
        return res.status(201).send(results.recordset[0]);
      });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.addProject = async (req, res) => {
  try {
    const { project_name, project_description, due_date } = req.body;
    //let insertProject = `Insert into projects(project_name, project_description) Values('${project_name}', '${project_description}')`
    let pool = await sql.connect(config);
    pool
      .request()
      .input("project_name", sql.VarChar, project_name)
      .input("project_description", sql.VarChar, project_description)
      .input("due_date", sql.Date, due_date)
      .execute("addProject", (err, results) => {
        if (err) {
          return res
            .status(500)
            .send({ message: "Oh, sorry, we appear to have a server error." });
        }
        res.status(201).send({ message: "project added successfully" });
      });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.updateProject = async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    let pool = await sql.connect(config);
    //let query = `select * from projects where project_id=${id}`;
    let project = (
      await pool.request().input("id", sql.Int, id).execute("getSingleProject")
    ).recordset[0];

    if (project) {
      let updated_project_name = req.body.project_name || project.project_name;
      let updated_project_description =
        req.body.project_description || project.project_description;
      let updated_due_date = req.body.due_date || project.due_date;

      //let updateProject = `Update projects set project_name='${updated_project_name}', project_description='${updated_project_description}' where project_id=${id}`;

      pool
        .request()
        .input("id", sql.Int, id)
        .input("project_name", sql.VarChar, updated_project_name)
        .input("project_description", sql.VarChar, updated_project_description)
        .input("due_date", sql.Date, updated_due_date)
        .execute("updateProject", (err, results) => {
          if (err) {
            console.log(err);
            return res.status(500).send({
              message: "Oh, sorry, we appear to have a server error.",
            });
          }
          res
            .status(201)
            .send({ message: "project details updated successfully" });
        });
    } else {
      res.status(500).send({ message: "Project does not exist" });
    }
  } catch (error) {
    res.send(500).send(error.message);
  }
};

exports.deleteProject = async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    //let deleteProject = `delete from projects where project_id=${id}`
    let pool = await sql.connect(config);
    pool
      .request()
      .input("id", sql.VarChar, id)
      .execute("deleteProject", (err, results) => {
        if (err) {
          console.log(err);
          res.status(500).send({
            message:
              "Oh, sorry we could not delete that project for some strange reason",
          });
        }
        // if (results.recordset === undefined) {
        //     res.status(400).send({message: "No project with that id exists"})
        // }
        res.status(201).send({ message: "Project deleted successfully" });
      });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.assignProject = async (req, res) => {
  try {
    const { project_id, user_id } = req.body;
    let pool = await sql.connect(config);

    let project = await pool
      .request()
      .input("id", sql.Int, project_id)
      .execute("getSingleProject");
    let user = await pool
      .request()
      .input("id", sql.Int, user_id)
      .execute("getSingleUser");

    if (!project_id) {
      res.status(400).send({ message: "You must provide a project id" });
    }
    if (!user_id) {
      res.status(400).send({ message: "You must provide a user id" });
    } else if (project.recordset.length === 0) {
      res.status(400).send({ message: "That project does not exist" });
    } else if (user.recordset.length === 0) {
      res.status(400).send({ message: "That user does not exist" });
    } else {
      pool
        .request()
        .input("project_id", sql.VarChar, project_id)
        .input("user_id", sql.VarChar, user_id)
        .execute("assignProject", (err, results) => {
          if (err) {
            console.log(err);
            return res.status(500).send({
              message: "Oh, sorry, we appear to have a server error.",
            });
          }
          res.status(201).send({
            message: `Project ${project_id} has been assigned to user ${user_id} successfully`,
          });
        });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getAssignedProject = async (req, res) => {
  try {
    let pool = await sql.connect(config);
    const { user_id } = req.params;

    console.log(user_id);
    pool
      .request()
      .input("user_id", sql.Int, user_id)
      .execute("getAssignedProject", (err, results) => {
        if (err) {
          console.log(err);
          return res
            .status(400)
            .send({ message: "Oh, sorry, we appear to have a server error." });
        }
        if (results.recordset.length === 0) {
          return res.status(406).send("No projects assigned to that user");
        }

        pool
          .request()
          .input("id", sql.Int, results.recordset[0].project_id)
          .execute("getSingleProject", (err, results) => {
            if (err) {
              return res.status(400).send({
                message: "Oh, sorry, we appear to have a server error.",
              });
            }
            return res.status(201).send(results.recordset[0]);
          });
      });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
