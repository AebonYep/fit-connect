const { net } = require('electron')

// entry point function
async function handleSignup(event, data){

    // Store data as a JSON object
    var jsonData = {
	email: data[0],
	name: data[1],
	password: data[2]
    }

    // Create a POST request to express server
    const request = net.request({
	method: 'POST',
	url: 'http://localhost:3000/',
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
    request.write(JSON.stringify(jsonData))

    request.end()

    return 'Recieved'
}

module.exports.handleSignup = handleSignup
