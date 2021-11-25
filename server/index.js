const sql = require('mssql');
const express = require('express');
const config = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRouters');
const protect = require('./middleware/authMiddleware')

const app = express();

app.use(express.json());

sql.connect(config).then(pool => {
    if (pool.connected) {
        console.log("connected to the msssql database");
    }
}).catch(e => console.log(e));


app.use('/users', userRoutes);
app.use('/projects', projectRoutes);



app.listen(8001);

