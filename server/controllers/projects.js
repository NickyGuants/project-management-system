const sql = require('mssql');
require('dotenv').config()

const config = require('../config/db');

exports.getProjects = async (req, res) => {
    try {
        let query = `select * from projects`;
        let pool = await sql.connect(config);

        pool.request().query(query, (err, results) => {
            if (err) {
                console.log(err)
                return res.status(400).send({message: "Oh, sorry, we appear to have a server error."});
            }
            if (results.recordset.length === 0) {
                return res.status(406).send("No projects in the database");
            }
            return res.status(201).send(results.recordset);
        })
        
    } catch (error) {
        console.log(error)
    }
}

exports.getSingleProject = async (req, res) => {
    try {
        let id = parseInt(req.params.id);
        let query = `select * from projects where project_id=${id}`;
        let pool = await sql.connect(config);

        pool.request().query(query, (err, results) => {
            if (err) {
                console.log(err)
                return res.status(400).send({message: "Oh, sorry, we appear to have a server error."});
            }
            if (results.recordset.length === 0) {
                return res.status(406).send("No project with that id in the database.");
            }
            return res.status(201).send(results.recordset[0]);
        })
        
    } catch (error) {
       res.status(500).send(error.message)
    }
}


exports.addProject = async (req, res) => {
    try {
        const { project_name, project_description } = req.body;
        let insertProject = `Insert into projects(project_name, project_description) Values('${project_name}', '${project_description}')`
        let pool = await sql.connect(config);
        pool.request().query(insertProject, (err, results) => {
            if (err) {
                return res.status(500).send({message: "Oh, sorry, we appear to have a server error."})
            }
            res.status(201).send({ message: "project added successfully" });
        })

    } catch (error) {
        res.status(500).send(error.message)
    }
}


