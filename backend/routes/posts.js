const express = require('express')
const router = express.Router()
const con = require('../mysqlConnection')

function simpleGet(query, callback) {
	con.query(query, (err, result) => {
		if (err) {
			throw err
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

	let getPostsQuery = `SELECT name, title, content, tags, user_accounts.type, date, user_id, user_posts.id FROM user_posts JOIN user_accounts ON user_accounts.id = user_posts.user_id ORDER BY user_posts.id DESC`
	// let getPostsQuery = `SELECT title, content, tags, type, date FROM user_posts`

	simpleGet(getPostsQuery, (result) => {
		res.send(result)
	})

})

router.post('/create', (req, res) => {
	let userID = req.body.userID
	let title = req.body.title
	let content = req.body.content
	let tags = req.body.tags
	let type = req.body.type
	let date = new Date().toISOString().split('T')[0]

	let createPostQuery = `INSERT INTO user_posts (user_id, title, content, tags, date, type) VALUES (${userID},'${title}', '${content}','${tags}', '${date}', '${type}') ON DUPLICATE KEY UPDATE id = id + 1`

	con.query(createPostQuery, (err, result) => {
		if (err) {
			res.sendStatus(500)
			throw err
		}

		res.sendStatus(200)
	})

})

router.post('/like', (req, res) => {
	let postID = req.body.postID
	let likePostQuery = `UPDATE user_posts SET likes=likes+1 WHERE id=${postID}`
	con.query(likePostQuery, (err, result) => {
		if (err) {
			res.sendStatus(500)
			throw err
		}
		res.send(200)
	})

})

router.post('/delete', (req, res) => {
	let postID = req.body.postID

	console.log(postID)
	let deletePostsQuery = `DELETE FROM user_posts WHERE id=${postID}`
	con.query(deletePostsQuery, (err) => {
		if (err) {
			res.sendStatus(500)
			throw err
		}
		console.log(`Posts deleted`)
		res.send(200)
	})
})


module.exports = router;
