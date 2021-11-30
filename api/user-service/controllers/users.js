const sql = require('mssql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require('dotenv').config()

const config = require('../config/db');

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

exports.addUser = async (req, res) => {
    try {
        //let users = `select * from users`;
        let pool = await sql.connect(config);
        let results = await pool.request().execute('getAllUsers');
        
        //regex to check password strength
        const capsAndNumber = new RegExp(
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])");
        const numberOfCharacters = new RegExp("^(?=.{8,})");
        const specialCharacters = new RegExp("^(?=.*[!@#$%^&*])");
        //Get data from the request body
        const { email, username, password, name } = req.body;
        const user = results.recordset.find((user) => user.email === email);

         //ensure the user has entered an email address
        if (!email) {
            res.status(401).send({message: "Fill in your email please." })
        }
        //ensure the user has entered a username
        else if (!username) {
            res.status(401).send({message: "fill in your username"});
        }
        //ensure the user has entered a password
        else if (!password) {
            res.status(401).send({message: "fill in your password"});
        }
    
        //Check that the password is eight characters long
        else if (!numberOfCharacters.test(password)) {
            res
            .status(401)
            .send(
                { message: "Password must be atleast 8 characters long" }
            );
        }
        //Check that the password contain special characters
        else if (!specialCharacters.test(password)) {
            res
            .status(401)
            .send(
                { message: "Password must contain special characters" }
            );
        }
        //Check that the password contain small letters, caps, and numbers
        else if (!capsAndNumber.test(password)) {
            res
                .status(401)
                .send(
                    { message: "Password must have small letters, caps and numbers" }
                );
        } else if (user && user.is_deleted ===0) {
            res.status(401)
            .send({ message: "That email is already taken. Please use a different email" });
        } 
    
        //Use bcrypt to hash the password and add the user to the users array
         else {
            //hash the received password
            const hashedPassword = await bcrypt.hash(password, 10);
            let pool = await sql.connect(config);
            //let query = `INSERT INTO users(username,password,name,email)VALUES('${username}','${hashedPassword}','${name}','${email}')`;
            pool.request()
                .input('username', sql.VarChar, username)
                .input('name', sql.VarChar, name)
                .input('email', sql.VarChar, email)
                .input('password', sql.VarChar, hashedPassword)
                .execute('insertUser', (error, recordset) => {
                if (error) {
                    res.status(500).send(error.message)
                }   
                res.status(201).send({ user, message: "user added successfully" });
            });
        }
        
    } catch (error) {
        res.status(401).send(error.message)
    }
}
//@Login

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        //let users = `select * from users`;
        let pool = await sql.connect(config);
        let results = await pool.request().execute('getAllUsers');

        const user = results.recordset.find((user) => user.email === email);
        if (!user) {
            return res.status(401).send({ "message": "No such user exists" });
          } else {
            bcrypt.compare(password, user.password, (err, result) => {
              if (!result) {
                return res.status(401).json({ message: "wrong password" });
              }
              jwt.sign({ email: user.email, username: user.username, password: user.password }, process.env.SECRET_KEY, (err, token) => {
                  return res.status(200).json({
                    user,
                    message: `${user.username} has been logged in successfully`,
                    token

                });
              });
            });
          }
    } catch (error) {
        res.status(401).send(error.message)
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
                    res.status(201).send({ message: "user details updated" });
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