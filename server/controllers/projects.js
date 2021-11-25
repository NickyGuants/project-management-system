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




