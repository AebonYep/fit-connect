
const address = localStorage.getItem("address")
const port = localStorage.getItem("port")

const usernameLabel = document.getElementById('username')
const bioLabel = document.getElementById('bio')
const followingList = document.getElementById('following-list')
const followersList = document.getElementById('followers-list')
const posts = document.getElementById('posts-table')


var userID

async function loadProfileData(){
    // Get user data
    let response = await fetch(`${address}:${port}/users/id=${userID}`)
    let jsonData = await response.json()

    usernameLabel.innerHTML = jsonData[0].name
    bioLabel.innerHTML = jsonData[0].bio

}

async function loadFollowing(){
    let innerHTML = "No-one :("
    
    let response = await fetch(`${address}:${port}/users/id=${userID}/following`)

    console.log(response.status)
    if(response.status === 200){
        let jsonData = await response.json()

        innerHTML = ""
        for(let i = 0; i < jsonData.length; i++){
            innerHTML += `<li>${jsonData[0].name}</li>`
        }   
    }
    followingList.innerHTML = innerHTML
}

async function loadFollowers(){
    let innerHTML = "No-one :("
    
    let response = await fetch(`${address}:${port}/users/id=${userID}/followers`)

    console.log(response.status)
    if(response.status === 200){
        let jsonData = await response.json()

        innerHTML = ""
        for(let i = 0; i < jsonData.length; i++){
            innerHTML += `<li>${jsonData[0].name}</li>`
        }   
    }
    followersList.innerHTML = innerHTML

}

async function loadPosts(){

    let innerHTML = "No Posts Found :("
    let response = await fetch(`${address}:${port}/users/id=${userID}/posts`)

    console.log(response.status)
    if(response.status === 200){
        let jsonData = await response.json()

        innerHTML = ""
        for(let i = 0; i < jsonData.length; i++){
            innerHTML += `<td>${jsonData[0].title}</td>`
        }   
    }
    posts.innerHTML = innerHTML

}

function entryPoint(){
    userID = localStorage.getItem("userID")

    loadProfileData()
    loadFollowing()
    loadFollowers()
    loadPosts()

}

window.onload = entryPoint()
