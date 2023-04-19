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

async function followClicked(followID){

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

    if(response.status === 200){
        alert("followed")
    }
    else if(response.status === 400){
        alert("cannot follow yourself")
    }
    else if(response.status === 409){
        alert("you already follow this user")
    }

    console.log(response.status)
}


function formatPost(post) {
    let text = ""
    if (post.type == "text") {

        text += `<button id='follow-btn' onclick='followClicked(${post.user_id})'> Follow ${post.name} </button>`
        text += "<h2>" + post.title + "</h2>"

        text += "<p>" + post.content + "</p>"
        text += "<small>" + post.tags + "</small>"
        //text += "<br>" + "<small>" + post.UserID + "</small>"
    }
    else if (post.type == "image") {
        /*text += "<img src="+ Images/example01.jpg +"> </img>" 
        something similar to this should work*/
        text += "<h2>" + post.title + "</h2>"
        text += "<img src=" + post.content + "> </img>"
        text += "<small>" + post.tags + "</small>"
        //text += "<br>" + "<small>" + post.UserID + "</small>"
    }
    return text
}


function entryPoint(){
    document.getElementById("posts").innerHTML =  grabPosts();

}

window.onload = entryPoint