// Store elements
const signupBtn = document.getElementById('signup-btn')
const emailInput = document.getElementById('email-input')
const nameInput = document.getElementById('name-input')
const passInput = document.getElementById('pass-input')
const vPassInput = document.getElementById('v-pass-input')

// Password Requirements
// TODO Change these later
const MIN_LENGTH = 1
const MIN_UPPER = 0
const MIN_NUM = 0

// Validation responses
const ALL_GOOD             = 'All Good'
const EMPTY_FIELD          = 'Field not filled'
const INVALID_EMAIL        = 'Invalid Email'
const INVALID_PASSWORD     = 'Invalid Password'
const PASSWORDS_DONT_MATCH = 'Passwords dont match'

// Send data to main process on button click
signupBtn.addEventListener('click', async () => {
    var results = validateInputs()
    if(results == ALL_GOOD){
	let userData = [emailInput.value, nameInput.value, passInput.value]
	// TODO add fetch api to send data to express app
    }
    else{
	// TODO Change how we display an invalid input to the user
	alert(`${results}`)
    }


})

function validateInputs(){
    var emailReturn = validateEmail()
    if(emailReturn != ALL_GOOD){
	return emailReturn
    }

    var nameReturn = validateName()
    if(nameReturn != ALL_GOOD){
	return nameReturn
    }

    var passwordReturn = validatePassword()
    if(passwordReturn != ALL_GOOD){
	return passwordReturn
    }

    return ALL_GOOD
}

function validateEmail(){
    var email = emailInput.value

    if(email.length <= 0)
	return EMPTY_FIELD

    // Regex for checking email
    let re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    var emailValid = email.toLowerCase().match(re)
    if(!emailValid)
	return INVALID_EMAIL
    
    return ALL_GOOD
}

function validateName(){
    var name = nameInput.value

    if(name.length <= 0)
	return EMPTY_FIELD

    return ALL_GOOD

}

function validatePassword(){
    var password = passInput.value
    var vPassword = vPassInput.value

    var numberOfLower = 0
    var numberOfUpper = 0
    var numberOfNums = 0
    var numberOfSpecial = 0


    if(password.length <= 0)
	return EMPTY_FIELD

    if(password !== vPassword)
	return PASSWORDS_DONT_MATCH

    // Check each character
    for(let i = 0; i < password.length; i++){
	let c = password[i]
	if(c >= '0' && c <= '9'){
	    numberOfNums++
	}
	else if(c >= 'A' && c <= 'Z'){
	    numberOfUpper++
	}
    } 

    if(numberOfNums >= MIN_NUM && numberOfUpper >= MIN_UPPER && password.length >= MIN_LENGTH){
	return ALL_GOOD
    }

    return INVALID_PASSWORD

}
