const express = require('express')
const mysql = require('mysql')

const app = express()
const port = 3000

const con = mysql.createConnection({
    host: "localhost",
    user: "admin",
    password: "test",
    database: "fit_connect"
});

app.use(express.json())

app.post('/signup', (req, res) => {
    console.log(req.body)

    var sql = `INSERT INTO user_accounts (email, name, password) VALUES ('${req.body.email}','${req.body.name}','${req.body.password}')`
    con.query(sql, function (err, result) {
	if (err) throw err
	console.log("1 record inserted")
    })
    res.send('Success')
})

app.listen(port, () => {
    con.connect(function(err) {
	if (err) throw err;
	console.log("Connected!");
    })
    console.log(`Listening on port ${port}`)
})
