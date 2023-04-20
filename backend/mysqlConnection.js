const mysql = require('mysql')

const con = mysql.createConnection({
    host: "your_host", // Default is localhost
    user: "your_user",
    password: "your_password",
    database: "your_database_name"
});
module.exports = con
