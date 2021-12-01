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