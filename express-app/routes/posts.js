const express = require('express')
const router = express.Router()
const con = require('../mysqlConnection')

function simpleGet(query, callback){
    con.query(query, (err, result) => {
	if (err) {
	    throw err
	    return callback(500)
	}
	if(result.length > 0){
	    return callback(result)
	}
	else{
	    return callback(404)
	}
    })
}

router.get('/', (req, res) => {

    let getPostsQuery = `SELECT name, content, date FROM user_posts JOIN user_accounts ON user_accounts.id = user_posts.user_id`

    simpleGet(getPostsQuery, (result) => {
	res.send(result)
    })

})

router.get('/id=:postID', (req, res) => {
    let { postID } = req.params

    let getPostsQuery = `SELECT name, content, date FROM user_posts JOIN user_accounts ON user_accounts.id = user_posts.user_id WHERE user_posts.id=${postID}`

    simpleGet(getPostsQuery, (result) => {
	res.send(result)
    })

})

router.post('/id=:userID/create', (req, res) => {
    let {userID} = req.params
    let content = req.body.content;
    let date = new Date().toISOString().split('T')[0]
   
    let createPostQuery = `INSERT INTO user_posts (user_id, content, date) VALUES (${userID}, '${content}', '${date}') ON DUPLICATE KEY UPDATE id = id + 1`

    con.query(createPostQuery, (err, result) => {
	if (err) {
	    res.sendStatus(500)
	    throw err
	}

	res.sendStatus(200)
    })

})



module.exports = router;
