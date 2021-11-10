const sql = require('mssql');
const express = require('express');
const config = require('./config/db');
const { getUsers, addUser, addProject, getSingleUser, updateUser, deleteUser, login } = require('./controllers/users');

const app = express();

app.use(express.json());

sql.connect(config).then(pool => {
    if (pool.connected) {
        console.log("connected to the msssql database");
    }
}).catch(e => console.log(e));


app.get('/users', getUsers);
app.get('/users/:id', getSingleUser);
app.post('/users/signup', addUser);
app.post('/users/login', login);
app.put('/users/project/:id', addProject);
app.put('/users/:id', updateUser);
app.delete('/users/:id/delete', deleteUser);


app.listen(3000);

