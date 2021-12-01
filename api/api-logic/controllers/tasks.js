const sql = require('mssql');
require('dotenv').config()
const config = require('../config/db')

exports.getAllTasks = async (req, res) => {
    try {
        let pool = await sql.connect(config)

        pool.request().execute('getAllTasks', (err, results) => {
            if (err) {
                console.log(err)
                res.status(500).send({ message: "An error occurred on our side" });
            }
            res.status(200).send(results.recordset)
        })

    } catch (error) {
        res.status(500).send(error.message)
    }
}

exports.getSingleTask = async(req, res) => {
    try {
        let pool = await sql.connect(config);

        let id = parseInt(req.params.id)

        pool.request().input('id', sql.Int, id).execute('getSingleTask', (err, results) => {
            if (err) {
                res.status(500).send({message: "an error occured on our side"})
            }
            res.status(200).send(results.recordset[0])
        })
    } catch (error) {
        res.status(500).send(error.message)
    }
}

exports.addTask = async (req, res) => {
    try {
        let pool = await sql.connect(config);
        const { task_name, task_description, is_complete, project_id } = req.body;

        pool.request().execute('getAllProjects', (err, results) => {
            if (err) {
                res.status({message: "error occured on our side"})
            }
            let project = results.recordset.find(project => project.project_id === project_id)
            if (project) {
                pool.request()
                .input('task_name', sql.VarChar, task_name)
                .input('task_description', sql.VarChar, task_description)
                .input('is_complete', sql.Bit, is_complete)
                .input('project_id', sql.Int, project_id)
                .execute('createTask', (err, results) => {
                    if (err) {
                       
                        res.status(500).send({message: "an error occured on our side"})
                    }
                    res.status(200).send({message: "task added sucessfully"})
            })
            } else {
                res.status(400).send({message: "Invalid project id, that project does not exist."})
            }
        })

        
    } catch (error) {
        res.status(500).send(error.message)
    }
}
exports.updateTask = async (req, res) => {
    try {
        let pool = await sql.connect(config)
        let id = parseInt(req.params.id)

        pool.request().input('id', sql.Int, id).execute('getSingleTask', (err, results) => {
            if (err) {
                res.status(500).send({message: "an error occured on our side"})
            }

            let task = results.recordset[0]

            let updated_task_name = req.body.task_name || task.task_name;
            let updated_task_description = req.body.task_description || task.task_description;
            let updated_status = req.body.is_complete || task.is_complete

            pool.request()
                .input('id', sql.Int, id)
                .input('task_description', sql.VarChar, updated_task_description)
                .input('task_name', sql.VarChar, updated_task_name)
                .input('is_complete', sql.Bit, updated_status)
                .execute('updateTask', (err, results) => {
                    if (err) {
                        res.status(500).send({ message: "an error occured on our side" })
                    }
                    res.status(201).send({message: "Task updated successfully"})
            })
        })

    } catch (error) {
        res.status(500).send(err.message)
    }
}

exports.deleteTask = async (req, res) => {
    try {
        let pool = await sql.connect(config)
        let id = parseInt(req.params.id)

        pool.request().input('id', sql.Int, id).execute('getSingleTask', (err, results) => {
            if (err) {
                res.status(500).send({message: "an error occured on our side"})
            }
            let task = results.recordset[0]
            if (task) {
                pool.request()
                .input('id', sql.Int, id)
                .execute('deleteTask', (err, results) => {
                    if (err) {
                        res.status(500).send({ message: "an error occured on our side" })
                    }
                    res.status(201).send({message: "Task deleted successfully"})
            })
            } else {
                res.send({message: "Task does not exist"})
            }
        })

    } catch (error) {
        res.status(500).send(err.message)
    }
}
