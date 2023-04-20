const address = localStorage.getItem("address")
const port = localStorage.getItem("port")

window.onload = loadnotifs2();

async function loadnotifs(){
    user = localStorage.getItem("userID")
    console.log("something random")
    const response = await fetch(`${address}:${port}/messages`);
    
    text = ""
    console.log(response.status)
    var jsonData = await response.json();

    console.log(jsonData)
    //clean through message data this is about as insecure as it gets please someone make this filter server side because any user could easily read any other users messages right now
    for(var i =0; i<jsonData.length; i++){
        if (jsonData[i].sender_id != user && jsonData[i].sentto_id != user){
            jsonData = jsonData.splice(i, 1)
        }
    }
    for(var i =0; i<jsonData.length; i++){
        otheruser = jsonData[i].sentto_id
        const jsonotherusernames = await getUser(otheruser);
        text+="<a href=\"../views/messages.html\">New Message from "+ jsonotherusernames[0].name+ "   received: " + jsonData[i].sent.slice(10, 19).replace('T', ' ') + "</a><br>"
    }
    //const responseUserFollowers = await fetch("http://lxfarm08.csc.liv.ac.uk:25565/users/id=${user}/followers");
    const responseUserFollowers = await fetch(`${address}:${port}/users/id=1`);
    const jsonDataUserFollowers = await responseUserFollowers.json();
    const allPosts = await fetch(`${address}:${port}/posts`);
    const allPostsJson = await allPosts.json();

    for (var i = 0; i < jsonDataUserFollowers.length; i++){
        const followerId = 1;
        const followerJson = await getUser(followerId);
        const followerName = followerJson[0].name;

        for (var j = 0; j < allPostsJson.length; j++){
            console.log("test new " + allPostsJson[j].user_id + " ahhhh " + followerId)

            if (allPostsJson[j].user_id == followerId) {
                text+="<a href=\"../views/messages.html\">New Post from "+ followerName + ":" + allPostsJson[i].date.slice(10, 19).replace('T', ' ') + "</a><br>"
            }
        }
    }

    document.getElementById("notifications").innerHTML = text;
}

async function getUser(user){
    const otherusernames = await fetch(`${address}:${port}/users/id=${user}`);
    const jsonotherusernames = await otherusernames.json()
    return jsonotherusernames;
}

async function loadnotifs2(){

    user = localStorage.getItem("userID")
    console.log("something random")
    const response = await fetch(`${address}:${port}/messages`);
    text = ""
    console.log(response.status)
    const jsonData = await response.json();
    console.log(jsonData)
    //clean through message data this is about as insecure as it gets please someone make this filter server side because any user could easily read any other users messages right now
    for(var i =0; i<jsonData.length; i++){
        if (jsonData[i].sentto_id != user){
            jsonData.splice(i, 1)
        }

    }
    for(var i =0; i<jsonData.length; i++){
        try{
        otheruser = jsonData[i].sender_id
        const otherusernames = await fetch(`${address}:${port}/users/id=${otheruser}`);
        const jsonotherusernames = await otherusernames.json()
        text+="<a href=\"../views/messages.html\">New Message from "+ jsonotherusernames[0].name+ "   received: " + jsonData[i].sent.slice(10, 19).replace('T', ' ') + "</a><br>"
        }catch{
            
        }
    }
    document.getElementById("notifications").innerHTML = text;


}