const jwt = require("jsonwebtoken");
const sql = require("mssql");
const config = require("../config/db");
const lodash = require("lodash");

exports.protect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        let pool = await sql.connect(config);
        pool
          .request()
          .input("email", sql.VarChar, decoded.email)
          .execute("login", (err, results) => {
            if (err) {
              res.status(500).send("Database error");
            }

            res.locals.user = lodash.pick(results.recordset[0], [
              "username",
              "email",
              "name",
              "is_admin",
            ]);
            next();
          });
      } catch (error) {
        console.error(error);
        res.status(401).send("Not authorized, token failed");
      }
    }
    if (!token) {
      res.status(401).json({ message: "No token found" });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.admin = (req, res, next) => {
  if (res.locals.user && res.locals.user.is_admin) {
    next();
  } else {
    res.status(401).send({
      message:
        "You must be an admin to perform this operation. Request admin access to continue",
    });
  }
};
