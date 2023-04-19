const deletePasswordInput = document.getElementById('delete-password-input')
const deleteAccountBtn = document.getElementById('delete-account-btn')

const address = localStorage.getItem("address")
const port = localStorage.getItem("port")

deleteAccountBtn.addEventListener('click', async (event) => {
	event.preventDefault()
	console.log(address)
	console.log("account delete button pressed")

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
