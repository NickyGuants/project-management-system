const sql = require('mssql');
const express = require('express');
const config = require('./config/db');
const projectRoutes = require('./routes/projectRouters');

const app = express();

app.use(express.json());

sql.connect(config).then(pool => {
    if (pool.connected) {
        console.log("connected to the msssql database");
    }
}).catch(e => console.log(e));

app.use('/projects', projectRoutes);



app.listen(8000);