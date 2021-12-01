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