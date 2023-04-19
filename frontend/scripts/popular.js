const address = localStorage.getItem("address")
const port = localStorage.getItem("port")

var posts;

async function grabdata() {
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



function formatPost(post) {
    let text = ""
    if (post.type == "text") {

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
let textresult = grabdata()
document.getElementById("posts").innerHTML = textresult;
