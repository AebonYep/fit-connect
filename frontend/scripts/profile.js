const usernameLabel = document.getElementById('username')
const bioLabel = document.getElementById('bio')

async function loadProfileData(userID){

    console.log(userID)
    // Get user data
    let response = await fetch(`http://localhost:3000/users/id=${userID}`)
    let jsonData = await response.json()

    usernameLabel.innerHTML = jsonData[0].name
    bioLabel.innerHTML = jsonData[0].bio

}

window.onload = loadProfileData(localStorage.getItem("userID"))
