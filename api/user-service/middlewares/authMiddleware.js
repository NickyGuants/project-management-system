const jwt = require('jsonwebtoken')
const sql = require('mssql');
const config = require('../config/db');

const protect = async (req, res, next) => {
    try {
        let token
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            try {
                token= req.headers.authorization.split(' ')[1]
                const decoded = jwt.verify(token, process.env.SECRET_KEY);

                let pool = await sql.connect(config);
                let query = `select * from users where email='${decoded.email}'`;
                results = await pool.request().query(query);
                req.user = results.recordset[0]
                next()
            } catch (error) {
                console.error(error)
                res.status(401).send("Not authorized, token failed")
            }
        }
        if (!token) {
            res.status(401).json({ message: "No token found" });
        }
        
    } catch (error) {
        console.log(error);
    }
    
}

module.exports= protect;