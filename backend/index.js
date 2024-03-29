const express = require('express')
const pool = require('./mysqlConnection')
const cors = require('cors')

// Routes
const accountsRoute = require('./routes/accounts')
const postsRoute = require('./routes/posts')
const messagesRoute = require('./routes/messages')

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())
app.use('/users', accountsRoute)
app.use('/posts', postsRoute)
app.use('/messages', messagesRoute)

app.listen(port, () => {
    pool.connect(function(err) {
	if (err) throw err;
	console.log("Connected!")
    })
    console.log(`Listening on port ${port}`)
})

