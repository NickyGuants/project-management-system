const sql = require("mssql");
const bcrypt = require("bcrypt");
require("dotenv").config();
const lodash = require("lodash");
const config = require("../config/db");
const generateToken = require("../helpers/generateToken");
const { password } = require("../config/db");

exports.addUser = async (req, res) => {
  try {
    //regex to check password strength
    const capsAndNumber = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])");
    const numberOfCharacters = new RegExp("^(?=.{8,})");
    const specialCharacters = new RegExp("^(?=.*[!@#$%^&*])");

    //Get data from the request body
    const { email, username, password, name } = req.body;
    let pool = await sql.connect(config);
    let results = await pool
      .request()
      .input("email", sql.VarChar, email)
      .execute("checkEmail");
    const user = results.recordset[0];

    //ensure the user has entered an email address
    if (!email) {
      res.status(401).send({ message: "Fill in your email please." });
    }
    //ensure the user has entered a username
    else if (!username) {
      res.status(401).send({ message: "fill in your username" });
    }
    //ensure the user has entered a password
    else if (!password) {
      res.status(401).send({ message: "fill in your password" });
    }

    //Check that the password is eight characters long
    else if (!numberOfCharacters.test(password)) {
      res
        .status(401)
        .send({ message: "Password must be atleast 8 characters long" });
    }
    //Check that the password contain special characters
    else if (!specialCharacters.test(password)) {
      res
        .status(401)
        .send({ message: "Password must contain special characters" });
    }
    //Check that the password contain small letters, caps, and numbers
    else if (!capsAndNumber.test(password)) {
      res.status(401).send({
        message: "Password must have small letters, caps and numbers",
      });
    } else if (user && user.is_deleted === 0) {
      res.status(401).send({
        message: "That email is already taken. Please use a different email",
      });
    } // else if(user && user.is_deleted ===1){
    //     pool
    // }

    //Use bcrypt to hash the password and add the user to the users array
    else {
      //hash the received password
      const hashedPassword = await bcrypt.hash(password, 10);
      let pool = await sql.connect(config);
      //let query = `INSERT INTO users(username,password,name,email)VALUES('${username}','${hashedPassword}','${name}','${email}')`;
      pool
        .request()
        .input("username", sql.VarChar, username)
        .input("name", sql.VarChar, name)
        .input("email", sql.VarChar, email)
        .input("password", sql.VarChar, hashedPassword)
        .execute("insertUser", (error, result) => {
          if (error) {
            res.status(500).send(error.message);
          } else {
            return res.status(201).json({
              user: { email, username, name },
              message: `${username} has been added successfully`,
              token: generateToken(email, username, name),
            });
          }
        });
    }
  } catch (error) {
    res.status(401).send(error.message);
  }
};
//@Login

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let pool = await sql.connect(config);
    let results = await pool
      .request()
      .input("email", sql.VarChar, email)
      .execute("checkEmail");

    const user = results.recordset[0];
    if (!user || user === undefined) {
      return res.status(401).send({ message: "No such user exists" });
    } else {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          res.status(500).send("An error occured");
        }
        if (!result) {
          return res.status(401).json({ message: "wrong password" });
        }
        return res.status(200).json({
          user: lodash.pick(user, [
            "id",
            "username",
            "email",
            "name",
            "is_admin",
          ]),
          message: `${user.username} has been logged in successfully`,
          token: generateToken(user.email, user.username, user.name),
        });
      });
    }
  } catch (error) {
    console.log(error);
    res.status(401).send(error.message);
  }
};

exports.resetPassword = async (req, res) => {
  try {
    let email = req.body.email;
    let updated_password = req.body.password;
    let confirm_password = req.body.confirm_password;

    if (!email) {
      res.status(401).send({ message: "You must provide an email" });
    } else if (!updated_password) {
      res.status(401).send({ message: "Please enter your new password" });
    } else if (!confirm_password) {
      res.status(401).send({ message: "Please confirm your new password" });
    } else if (updated_password !== confirm_password) {
      res.status(400).send({ message: "Passwords do not match" });
    } else {
      let pool = await sql.connect(config);
      let results = await pool
        .request()
        .input("email", sql.VarChar, email)
        .execute("checkEmail");
      const user = results.recordset[0];

      if (user) {
        const hashedPassword = await bcrypt.hash(updated_password, 10);
        pool
          .request()
          .query(
            `Update users set password='${hashedPassword}' where email='${email}'`
          );
        res
          .status(200)
          .send({ message: "password has been successfully reset" });
      }
    }
  } catch (error) {
    res.status(401).send(error.message);
  }
};
