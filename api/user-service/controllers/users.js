const sql = require('mssql');
const { password } = require('../config/db');
require('dotenv').config()
const config = require('../config/db');
const generateToken = require('../helpers/generateToken');

exports.getUsers = async (req, res) => {
    try {
        //let query = `select * from users`;
        let pool = await sql.connect(config);
        let results = await pool.request().execute('getAllUsers');
        if (results.recordset.length === 0) {
            return res.status(406).send("No users in the database");
        }
        return res.status(201).send(results.recordset);
    } catch (error) {
        console.log(error);
    } 
}


// @Get a single user
exports.getSingleUser = async (req, res) => {
    try {
        let id = parseInt(req.params.id);
        let pool = await sql.connect(config);
        //let query = `select * from users where id=${id}`;
        pool.request().input('id', sql.Int, id).execute('getSingleUser',
            (err, results) => {
                if (err) {
                    res.status(500).send({message: "An error occurred"})
                }
                if(results.recordset.length ===0)
                res.status(406).send("No user with that id exists in the database");
                else {
                    res.status(201).send(results.recordset[0])
                }
        });
        
    } catch (error) {
        res.status(401).send(error.message)
    }
}

//@update a user infomartion
exports.updateUser = async(req, res) =>{
    try {
        let id = parseInt(req.params.id);
        //const { username, email, name } = req.body;
        let pool = await sql.connect(config);
        let user = (await pool.request().input('id', sql.Int, id).execute('getSingleUser')).recordset[0]
        //let updateQuery = `Update users set username='${username}', email='${email}' where id=${id}`;
        if (user === undefined) {
            res.send(`No user with id ${id} exists`)
        }
        if (user) {
            let updated_name = req.body.name || user.name
            let updated_username = req.body.username || user.username
            let updated_email = req.body.email || user.email

            pool.request()
                .input('id', sql.Int, id)
                .input('email', sql.VarChar, updated_email)
                .input('username', sql.VarChar, updated_username)
                .input('name', sql.VarChar, updated_name)
                .execute('updateUser', (error, results) => {
                    if (error) {
                        console.log(error)
                        res.status(500).send({message: "An error occurred"})
                    }
                    res.status(201).send(
                        {
                            updated_user: updated_email, updated_name, updated_username,
                            message: "user details updated"
                        }
                    );
            })
        }
        
    } catch (error) {
        res.status(500).send(error.message)
    }
}

//@Delete  a user from the database
exports.deleteUser = async (req, res) => {
    try {
        let id = parseInt(req.params.id);
        let pool = await sql.connect(config);
        pool.request().input('id', sql.Int, id).execute('deleteUser', (err, results) => {
            
            if (err) {
                res.send({message: "An error occured"})
            }
            res.status(201).send(`user with id ${id} has been deleted`);
        })
        
    } catch (error) {
        res.status(401).send(error.message)
    }
}

