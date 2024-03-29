const address = localStorage.getItem("address")
const port = localStorage.getItem("port")

const titleInput = document.getElementById('title-input')
const contentInput = document.getElementById('content-input')
const createPostBtn = document.getElementById('create-post-btn')

createPostBtn.addEventListener('click', async (event) => {
    event.preventDefault()

    let jsonData = {
        userID: localStorage.getItem("userID"),
        title: titleInput.value,
        content: contentInput.value,
        type: "text"
    }

    let response = await fetch(`${address}:${port}/posts/create`, {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(jsonData)
    })
    
    if(response.status === 200){
        window.location.href = "../views/popular.html"
    }

})