const mysql = require('mysql')

const con = mysql.createConnection({
    host: "localhost",
    user: "admin",
    password: "test",
    database: "fit_connect"
});
module.exports = con
