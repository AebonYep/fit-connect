const { net } = require('electron')

// entry point function
async function handleSignup(event, data){

    // TODO 
    console.log('signup pressed')

    let userData = {
	email: data[0],
	name: data[1],
	password: data[2],
    }

    const request = net.request({
	method: 'POST',
	url: 'http://localhost:3000/users/signup',
    })
    request.setHeader('Content-Type', 'application/json')
    // On response just output what we recieved
    request.on('response', (resp) => {
	console.log(`STATUS: ${resp.statusCode}`)
	console.log(`HEADERS: ${JSON.stringify(resp.headers)}`)
	resp.on('data', (chunk) => {
	    console.log(`BODY: ${chunk}`)
	})
    })

    // Send JSON object to express server
    request.write(JSON.stringify(userData))

    request.end()

    return 'Recieved'
}

// entry point function
async function handleLogin(event, data){

    console.log('login pressed')

    let userData = {
	email: data[0],
	password: data[1],
    }

    console.log(data)
    console.log(userData)

    const request = net.request({
	method: 'POST',
	url: 'http://localhost:3000/users/login',
    })
    request.setHeader('Content-Type', 'application/json')
    // On response just output what we recieved
    request.on('response', (resp) => {
	console.log(`STATUS: ${resp.statusCode}`)
	console.log(`HEADERS: ${JSON.stringify(resp.headers)}`)
	resp.on('data', (chunk) => {
	    console.log(`BODY: ${chunk}`)
	})
    })

    // Send JSON object to express server
    request.write(JSON.stringify(userData))
    request.end()

    return 'Recieved'
}

module.exports.handleLogin = handleLogin
module.exports.handleSignup = handleSignup
