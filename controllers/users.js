const sql = require('mssql');
const bcrypt = require('bcrypt');

const config = require('../config/db');
const { pool } = require('../config/db');

exports.getUsers = async (req, res) => {
    try {
        let query = await `select * from users`;
        let pool = await sql.connect(config);
        let results = await pool.request().query(query);
        //console.log(results.recordsets)
        return res.status(201).send(results.recordsets);
    } catch (error) {
        console.log(error);
    } 
}

exports.addUser = async (req, res) => {
    try {
        //regex to check password strength
        const capsAndNumber = new RegExp(
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])");
        const numberOfCharacters = new RegExp("^(?=.{8,})");
        const specialCharacters = new RegExp("^(?=.*[!@#$%^&*])");
        //Get data from the request body
        const { email, username, password, confirmPassword, first_name, last_name, project } = req.body;

         //ensure the user has entered an email address
        if (!email) {
            res.status(406).send("Fill in your email please.");
        }
        //ensure the user has entered a username
        else if (!username) {
            res.status(406).send("fill in your username");
        }
        //ensure the user has entered a password
        else if (!password) {
            res.status(406).send("fill in your password");
        }
        //ensure the user has confirmed their passoword
        else if (!confirmPassword) {
            res.status(406).send("You must fill in the confirm password field");
        }
    
        //Check that the password is eight characters long
        else if (!numberOfCharacters.test(password)) {
            res
            .status(406)
            .send(
                "Password must be atleast 8 characters long"
            );
        }
        //Check that the password contain special characters
        else if (!specialCharacters.test(password)) {
            res
            .status(406)
            .send(
                "Password must contain special characters"
            );
        }
        //Check that the password contain small letters, caps, and numbers
        else if (!capsAndNumber.test(password)) {
            res
            .status(406)
            .send(
                "Password must have small letters, caps and numbers  "
            );
        }
    
        //Check that the password is the same as the confirm password field
        else if (password !== confirmPassword) {
            res.status(406).send("password and Confirm password entries should match.")
    
        //Use bcrypt to hash the password and add the user to the users array
        } else {
            //hash the received password
            const hashedPassword = await bcrypt.hash(password, 10);
            let pool = await sql.connect(config);
            let query = `INSERT INTO users(username,password,first_name,last_Name,project,email)VALUES('${username}','${hashedPassword}','${first_name}','${last_name}','${project}','${email}')`;
            await pool.request().query(query);
            res.status(201).send("user added successfully");
        }
        
    } catch (error) {
        console.log(error);
    }
}

exports.addProject = async (req, res) => {
    try {
        let id = parseInt(req.params.id);
        const { project } = req.body;
        let pool = await sql.connect(config);
        let query = `update users set project='${project}' where id=${id}`;
        await pool.request().query(query);
        res.status(201).send("project added");
    } catch (error) {
        console.log(error);
    }
}