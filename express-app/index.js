const express = require('express')

const app = express()
const port = 3000


app.use(express.json())

app.post('/signup', (req, res) => {
    console.log(req.body)
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
