// Store elements
const emailInput = document.getElementById('email-input')
const passInput = document.getElementById('password-input')
const loginBtn = document.getElementById('login-btn')


loginBtn.addEventListener('click', async () => {
    console.log('beans')

    let jsonData = {
	email: emailInput.value, 
	password: passInput.value
    }
    let response = await fetch("http://localhost:3000/users/login", {
	method: "POST",
	mode: "cors",
	headers: {
	    "Content-Type": "application/json"
	},
	body: JSON.stringify(jsonData)
    })

    console.log(response)
    // Account created
    if(response.status === 200){
	let jsonData = await response.json()
	localStorage.setItem("userID", jsonData.userID)
	window.location.href="../views/profile.html"
    }
    // Email already exists
    if(response.status === 409){
	alert("account already exists")
    }

})
