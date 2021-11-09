const sql = require('mssql');
const express = require('express');
const config = require('./config/db');
const { getUsers, addUser, addProject } = require('./controllers/users');

const app = express();

app.use(express.json());

sql.connect(config).then(pool => {
    if (pool.connected) {
        console.log("connected to the msssql database");
    }
}).catch(e => console.log(e));


app.get('/users', getUsers);
app.post('/users/signup', addUser);
app.put('/users/:id', addProject);

app.listen(3000);

