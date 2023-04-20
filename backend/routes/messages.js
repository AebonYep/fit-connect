const express = require('express')
const router = express.Router()
const con = require('../mysqlConnection')

function simpleGet(query, callback) {
	con.query(query, (err, result) => {
		if (err) {
			return callback(500)
		}
		if (result.length > 0) {
			return callback(result)
		}
		else {
			return callback(404)
		}
	})
}

router.get('/', (req, res) => {

    console.log('ok')
	let getUsersQuery = `SELECT * FROM user_messages`

	simpleGet(getUsersQuery, (result) => {
		res.send(result)
	})
})

module.exports = router