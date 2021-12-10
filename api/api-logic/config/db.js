require("dotenv").config();

let config = {
  server: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,

  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    encrypt: true,
    enaableArithAbort: true,
    trustServerCertificate: true,
  },
};

module.exports = config;
