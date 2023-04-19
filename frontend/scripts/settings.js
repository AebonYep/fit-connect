const deletePasswordInput = document.getElementById('delete-password-input')
const deleteAccountBtn = document.getElementById('delete-account-btn')

deleteAccountBtn.addEventListener('click', async (event) => {
    event.preventDefault()

    let jsonData = {
	password: deletePasswordInput.value
    }

    let response = await fetch("http://localhost:3000/users/delete",{
	method: "POST",
	mode: "cors",
	headers: {
	    "Content-Type": "application/json"
	},
	body: JSON.stringify(jsonData)
    })
    console.log(response)
})
