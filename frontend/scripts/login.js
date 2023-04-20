const address = localStorage.getItem("address")
const port = localStorage.getItem("port")

// Store elements
const emailInput = document.getElementById('email-input')
const passInput = document.getElementById('password-input')
const loginBtn = document.getElementById('login-btn')


loginBtn.addEventListener('click', async (event) => {

    event.preventDefault();

    localStorage.setItem("admin", "false")

    let jsonData = {
        email: emailInput.value,
        password: passInput.value
    }
    let response = await fetch(`${address}:${port}/users/login`, {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(jsonData)
    })

    console.log(response)
    // Account signed in
    if (response.status === 200) {
        let jsonData = await response.json()
        console.log(jsonData)
        localStorage.setItem("userID", jsonData.userID)
        if(jsonData.type === "admin"){
            console.log("ok")
            localStorage.setItem("admin", "true")
        }
        alert("test")
        window.location.href = "../views/profile.html"
    }
    // Email already exists
    if (response.status === 401) {
        alert("incorrect password")
    }

})