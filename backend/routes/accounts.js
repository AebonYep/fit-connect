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

	let getUsersQuery = `SELECT id, name, bio, goals FROM user_accounts`

	simpleGet(getUsersQuery, (result) => {
		res.send(result)
	})
})

router.get('/name=:userName', (req, res) => {
	let { userName } = req.params
	let getUsersQuery = `SELECT id, name FROM user_accounts WHERE name LIKE '%${userName}%'`
	simpleGet(getUsersQuery, (result) => {
		res.send(result)
	})
})

router.get('/id=:userID', (req, res) => {
	let { userID } = req.params

	let getUserQuery = `SELECT name, bio, goals FROM user_accounts WHERE id='${userID}'`


	simpleGet(getUserQuery, (result) => {
		res.send(result)
	})

})

router.get('/id=:userID/followers', (req, res) => {
	let { userID } = req.params

	let getFollowersQuery = `SELECT id, name FROM user_accounts JOIN user_followers ON user_accounts.id = user_followers.following_id WHERE user_id=${userID}`

	simpleGet(getFollowersQuery, (result) => {
		res.send(result)
	})

})

router.get('/id=:userID/posts', (req, res) => {
	let { userID } = req.params

	let getPostsQuery = `SELECT content, date FROM user_posts WHERE user_id=${userID}`

	simpleGet(getPostsQuery, (result) => {
		res.send(result)
	})

})

// Request to login to user account
router.post('/login', (req, res) => {
	let email = req.body.email;
	let password = req.body.password;

	let checkAccountQuery = `SELECT id, email, password FROM user_accounts WHERE email='${email}'`
	con.query(checkAccountQuery, (err, result) => {
		if (err) {
			res.sendStatus(500)
			throw err
		}
		if (result.length > 0) {
			console.log(result[0].email)
			console.log(result[0].password)

			if (password === result[0].password) {
				let returnData = {
					"userID": result[0].id
				}
				res.send(returnData)
			}
			else {
				res.sendStatus(401)
			}
		}
		else {
			res.sendStatus(404)
		}

	})
})

// Request to create account if it is successful it will return the user id
router.post('/signup', (req, res) => {
	let email = req.body.email
	let name = req.body.name
	let password = req.body.password
	let id = 0

	let checkEmailQuery = `SELECT email FROM user_accounts WHERE email='${email}'`
	let getIDQuery = `SELECT MAX(id) FROM user_accounts`

	con.query(getIDQuery, (err, result) => {
		if (err) {
			res.sendStatus(500)
			throw err
		}
		if (result.length > 0) {
			id = result[0]['MAX(id)'] + 1
		}
	})

	con.query(checkEmailQuery, (err, result) => {
		if (err) {
			res.sendStatus(500)
			throw err
		}
		if (result.length == 0) {
			let insertQuery = `INSERT INTO user_accounts (id, email, name, password) VALUES (${id}, '${email}','${name}','${password}')`
			con.query(insertQuery, (err, result) => {
				if (err) {
					res.sendStatus(500)
					throw err
				}
				if (err) throw err
				let returnData = { "id": id }
				res.send(returnData)
			})
		}
		else {
			res.sendStatus(409)
		}
	})
})

// Request to follow user
router.post('/follow', (req, res) => {
	let userID = req.body.userID
	let followingID = req.body.followingID

	let addFollowerQuery = `INSERT INTO user_followers (user_id, following_id) VALUES (${userID},${followingID})`
	con.query(addFollowerQuery, (err, result) => {
		if (err) {
			res.sendStatus(500)
			throw err
		}
		res.send(200)

	})

})

// Request to add bio
router.post('/bio', (req, res) => {
	let userID = req.body.userID
	let bioContent = req.body.content

	let addBioQuery = `UPDATE user_accounts SET bio='${bioContent}' WHERE id=${userID}`

	con.query(addBioQuery, (err, result) => {
		if (err) throw err
		res.sendStatus(200)
	})
})

router.post('/change-username', (req, res) => {
	let userID = req.body.userID
	let newName = req.body.newName
	let password = req.body.password

	let checkAccountQuery = `SELECT * FROM user_accounts WHERE id=${userID}`
	con.query(checkAccountQuery, (err, result) => {
		if (err) {
			res.sendStatus(500)
			throw err
		}
		if (result.length > 0) {

			if (password === result[0].password) {
				let changeNameQuery = `UPDATE user_accounts SET name='${newName}' WHERE id=${userID}`
				con.query(changeNameQuery, (err) => {
					if (err) {
						res.sendStatus(500)
						throw err
					}
					res.send(200)
				})
			}
			else {
				res.sendStatus(401)
			}
		}
		else {
			res.sendStatus(404)
		}

	})

})

router.post('/delete', (req, res) => {
	let userID = req.body.userID
	let password = req.body.password

	let checkAccountQuery = `SELECT * FROM user_accounts WHERE id=${userID}`
	con.query(checkAccountQuery, (err, result) => {
		if (err) {
			res.sendStatus(500)
			throw err
		}
		if (result.length > 0) {
			console.log(result[0].email)
			console.log(result[0].password)

			if (password === result[0].password) {
				let deleteAccountQuery = `DELETE FROM user_accounts WHERE id=${userID}`
				con.query(deleteAccountQuery, (err) => {
					if (err) {
						res.sendStatus(500)
						throw err
					}
					res.send(200)
				})
			}
			else {
				res.sendStatus(401)
			}
		}
		else {
			res.sendStatus(404)
		}

	})
})

module.exports = router
