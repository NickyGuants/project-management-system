const sql = require('mssql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require('dotenv').config()
const lodash = require('lodash')
const config = require('../config/db');

exports.addUser = async (req, res) => {
    try {
        
        //regex to check password strength
        const capsAndNumber = new RegExp(
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])");
        const numberOfCharacters = new RegExp("^(?=.{8,})");
        const specialCharacters = new RegExp("^(?=.*[!@#$%^&*])");

        //Get data from the request body
        const { email, username, password, name } = req.body;
        let pool = await sql.connect(config);
        let results = await pool.request().input('email', sql.VarChar, email).execute('login');
        const user = results.recordset[0]

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
            res.status(401).send({ message: "That email is already taken. Please use a different email" });
         }// else if(user && user.is_deleted ===1){
        //     pool
        // } 
    
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
                .execute('insertUser', (error, result) => {
                if (error) {
                    res.status(500).send(error.message)
                } else {
                    jwt.sign({ email, username, name}, process.env.SECRET_KEY,{expiresIn: '1800s'}, (err, token) => {
                        return res.status(201).json({
                            user: {email, username, name},
                            message: `${username} has been added successfully`,
                            token
                      });
                    });
                }   
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
        let pool = await sql.connect(config);
        let results = await pool.request().input('email', sql.VarChar, email).execute('login');

        const user = results.recordset[0];
        if (!user || user===undefined) {
            return res.status(401).send({ "message": "No such user exists" });
          } else {
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                    res.status(500).send("An error occured")
                }
              if (!result) {
                return res.status(401).json({ message: "wrong password" });
              }
                jwt.sign({ email: user.email, username: user.username, name: user.name }, process.env.SECRET_KEY,{expiresIn: '1800s'}, (err, token) => {
                    if (err) {
                      res.status(500).send("An error occured")
                    }
                    
                  return res.status(200).json({
                    user:lodash.pick(user, ['username', 'email', 'name']),
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
