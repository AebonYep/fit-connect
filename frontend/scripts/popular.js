const address = localStorage.getItem("address")
const port = localStorage.getItem("port")

async function grabPosts() {
    let text = "";

    // Get posts
    const response = await fetch(`${address}:${port}/posts`);
    const jsonData = await response.json();
    console.log(jsonData)

    // Add posts to page

    for (var i = 0; i < jsonData.length; i++) {
        text += "<div class='post__container'><div class ='post'>"
        text += formatPost(jsonData[i])
        text += "</div></div><br>"
    }

    document.getElementById("posts").innerHTML = text;
    return text
}

async function followClicked(followID) {

    let jsonData = {
        userID: localStorage.getItem("userID"),
        followingID: followID

    }

    let response = await fetch(`${address}:${port}/users/follow`, {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(jsonData)
    })

    if (response.status === 200) {
        alert("followed")
    }
    else if (response.status === 400) {
        alert("cannot follow yourself")
    }
    else if (response.status === 409) {
        alert("you already follow this user")
    }

    console.log(response.status)
}

async function likeClicked(postID) {
    let jsonData = {
        postID: postID

    }

    let response = await fetch(`${address}:${port}/posts/like`, {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(jsonData)
    })

    if (response.status === 200) {
        alert("liked")
    }
    else if (response.status === 409) {
        alert("you already like this post")
    }

    console.log(response.status)
}

async function deletePost(postID) {
    let jsonData = {
        postID: postID

    }

    let response = await fetch(`${address}:${port}/posts/delete`, {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(jsonData)
    })

    if (response.status === 200) {
        window.location.reload()
    }

    console.log(response.status)
}

function formatPost(post) {
    let text = ""
    console.log(post.type)
    let admin = localStorage.getItem("admin")
    console.log(admin)


    if (admin === "true") {
        console.log("ok")
        text += `<button id='follow-btn' onclick='deletePost(${post.id})'>Delete Post</button>`
    }
    text += `<button id='follow-btn' onclick='followClicked(${post.user_id})'> Follow ${post.name} </button>`
    text += `<button id='follow-btn' onclick='likeClicked(${post.id})'> Like </button>`

    text += "<h2>" + post.title + "</h2>"

    text += "<p>" + post.content + "</p>"
    text += "<small>" + post.tags + "</small>"
    //text += "<br>" + "<small>" + post.UserID + "</small>"


    return text
}


function entryPoint() {
    document.getElementById("posts").innerHTML = grabPosts();

}

window.onload = entryPoint