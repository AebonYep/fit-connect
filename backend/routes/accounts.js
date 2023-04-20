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

router.get('/id=:userID/following', (req, res) => {
	let { userID } = req.params

	let getFollowersQuery = `SELECT name FROM user_accounts JOIN user_followers ON user_accounts.id = user_followers.following_id WHERE user_id=${userID}`

	simpleGet(getFollowersQuery, (result) => {
		res.send(result)
	})

})


router.get('/id=:userID/followers', (req, res) => {
	let { userID } = req.params

	let getFollowersQuery = `SELECT name FROM user_accounts JOIN user_followers ON user_accounts.id = user_followers.user_id WHERE following_id=${userID}`

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

	let checkAccountQuery = `SELECT id, email, password, type FROM user_accounts WHERE email='${email}'`
	con.query(checkAccountQuery, (err, result) => {
		if (err) {
			res.sendStatus(500)
			throw err
		}
		if (result.length > 0) {
			console.log("logged in")

			if (password === result[0].password) {
				let returnData = {
					"userID": result[0].id,
					"type": result[0].type

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
	let type = 'user'

	let checkEmailQuery = `SELECT email FROM user_accounts WHERE email='${email}' OR name='${name}'`
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
			let insertQuery = `INSERT INTO user_accounts (id, email, name, password, type) VALUES (${id}, '${email}','${name}','${password}', '${type}')`
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

	if (userID != followingID) {
		let checkFollowerQuery = `SELECT * FROM user_followers WHERE user_id='${userID}' OR following_id='${followingID}'`
		con.query(checkFollowerQuery, (err, result) => {
			if (err) {
				res.sendStatus(500)
				throw err
			}
			if (result.length == 0) {
				let addFollowerQuery = `INSERT INTO user_followers (user_id, following_id) VALUES (${userID},${followingID})`
				con.query(addFollowerQuery, (err, result) => {
					if (err) {
						res.sendStatus(500)
						throw err
					}
					res.send(200)

				})
			}
			else {
				res.send(409)
			}
		})
	}
	else {
		res.send(400)
	}

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

	let checkNameQuery = `SELECT * FROM user_accounts WHERE name='${newName}'`
	let checkAccountQuery = `SELECT * FROM user_accounts WHERE id=${userID}`
	con.query(checkAccountQuery, (err, result) => {
		if (err) {
			res.sendStatus(500)
			throw err
		}
		if (result.length > 0) {

			if (password === result[0].password) {
				con.query(checkNameQuery, (err, result) => {
					if (err) {
						res.sendStatus(500)
						throw err
					}
					if (result.length === 0) {
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
						res.send(409)
					}
				})
			}
			else {
				res.send(401)
			}

		}
		else {
			res.sendStatus(404)
		}

	})

})

router.post('/change-bio', (req, res) => {
	let userID = req.body.userID
	let newBio = req.body.newBio

	let checkAccountQuery = `SELECT * FROM user_accounts WHERE id=${userID}`
	con.query(checkAccountQuery, (err, result) => {
		if (err) {
			res.sendStatus(500)
			throw err
		}
		if (result.length > 0) {

			let changeNameQuery = `UPDATE user_accounts SET bio='${newBio}' WHERE id=${userID}`
			con.query(changeNameQuery, (err) => {
				if (err) {
					res.sendStatus(500)
					throw err
				}
				res.send(200)
			})

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
				let deletePostsQuery = `DELETE FROM user_posts WHERE user_id=${userID}`
				con.query(deletePostsQuery, (err) => {
					if (err) {
						res.sendStatus(500)
						throw err
					}
					console.log(`Posts delete for userID=${userID}`)
				})
				let removeFollowersQuery = `DELETE FROM user_followers WHERE user_id=${userID} OR following_id=${userID}`
				con.query(removeFollowersQuery, (err) => {
					if (err) {
						res.sendStatus(500)
						throw err
					}
					console.log(`Followers removed for userID=${userID}`)
				})
				let deleteAccountQuery = `DELETE FROM user_accounts WHERE id=${userID}`
				con.query(deleteAccountQuery, (err) => {
					if (err) {
						res.sendStatus(500)
						throw err
					}
					console.log(`Account deleted userID: ${userID}`)
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

router.post('/admin/delete', (req, res) => {
	let name = req.body.name

	let checkAccountQuery = `SELECT * FROM user_accounts WHERE name='${name}'`
	con.query(checkAccountQuery, (err, result) => {
		if (err) {
			res.sendStatus(500)
		}
		
		if (result.length > 0) {
			console.log(result[0])
			let userID = result[0].id
			let deletePostsQuery = `DELETE FROM user_posts WHERE user_id=${userID}`
			con.query(deletePostsQuery, (err) => {
				if (err) {
					res.sendStatus(500)
					throw err
				}
				console.log(`Posts delete for userID=${userID}`)
			})
			let removeFollowersQuery = `DELETE FROM user_followers WHERE user_id=${userID} OR following_id=${userID}`
			con.query(removeFollowersQuery, (err) => {
				if (err) {
					res.sendStatus(500)
					throw err
				}
				console.log(`Followers removed for userID=${userID}`)
			})
			let deleteAccountQuery = `DELETE FROM user_accounts WHERE id=${userID}`
			con.query(deleteAccountQuery, (err) => {
				if (err) {
					res.sendStatus(500)
					throw err
				}
				console.log(`Account deleted userID: ${userID}`)
				res.send(200)
			})
		}
		else {
			res.sendStatus(404)
		}

	})
})

module.exports = router
