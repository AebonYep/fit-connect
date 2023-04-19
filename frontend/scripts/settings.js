const changeNameInput = document.getElementById('change-name-input')
const changeNamePassInput = document.getElementById('change-name-password-input')
const changeNameBtn = document.getElementById('change-name-btn')

const deletePasswordInput = document.getElementById('delete-password-input')
const deleteAccountBtn = document.getElementById('delete-account-btn')

const address = localStorage.getItem("address")
const port = localStorage.getItem("port")

deleteAccountBtn.addEventListener('click', async (event) => {
	event.preventDefault()

	let jsonData = {
		userID: localStorage.getItem("userID"),
		password: deletePasswordInput.value
	}

	let response = await fetch(`${address}:${port}/users/delete`, {
		method: "POST",
		mode: "cors",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(jsonData)
	})
	if(response.status === 200){
		localStorage.setItem("userID", null)
		window.location.href="../views/index.html"
	}
	else if(response.status === 401){
		alert("incorrect password")
	}
	console.log(response.status)
})

changeNameBtn.addEventListener('click', async (event) => {
	event.preventDefault()

	let jsonData = {
		userID: localStorage.getItem("userID"),
		newName: changeNameInput.value,
		password: changeNamePassInput.value

	}
	
	let response = await fetch(`${address}:${port}/users/change-username`, {
		method: "POST",
		mode: "cors",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(jsonData)
	})
	if(response.status === 200){
		alert("name changed!")
	}
	else if(response.status === 401){
		alert("incorrect password")
	}

})