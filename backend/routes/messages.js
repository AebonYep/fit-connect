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

    let getPostsQuery = `SELECT * FROM user_messages ORDER BY sent`

    simpleGet(getPostsQuery, (result) => {
	res.send(result)
    })

})



router.get('/id=:messagewith&nextid=:sentid', (req, res) => {
    let { messagewith, sentid } = req.params
    

    let getPostsQuery = `SELECT * FROM user_messages WHERE sender_id = ${sentid} OR sentto_id = ${sentid} ORDER BY sent`

    simpleGet(getPostsQuery, (result) => {
	res.send(result)
    })

})

router.post('/create', (req, res) => {
    let userid = req.body.userid
    let otheruserid = req.body.otheruserid
    let content = req.body.content
    let createPostQuery = `INSERT INTO user_messages (sender_id, sentto_id, content, sent) values(${userid}, ${otheruserid}, '${content}', CURRENT_TIMESTAMP)`

    con.query(createPostQuery, (err, result) => {
	if (err) {
	    res.sendStatus(500)
	    throw err
	}

	res.sendStatus(200)
    })

})



module.exports = router;
