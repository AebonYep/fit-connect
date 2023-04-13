// Return value meanings
// 0 - Everything works
// 1 - Password doesnt match

// entry point function
async function handleSignup(event, data){
    console.log(data)
    return 'Recieved'
}

module.exports.handleSignup = handleSignup
