const address = localStorage.getItem("address")
const port = localStorage.getItem("port")

const user = localStorage.getItem("userID"); //this needs to be updated to grab the current user
const messagebutton = null

async function getdata() {
    console.log("something random")
    const response = await fetch(`${address}:${port}/messages`);
    console.log(response.status)
    const jsonData = await response.json();
    console.log(jsonData)
    //clean through message data this is about as insecure as it gets please someone make this filter server side because any user could easily read any other users messages right now
    for(var i =0; i<jsonData.length; i++){
        if (jsonData[i].sender_id != user && jsonData[i].sentto_id != user){
            jsonData.splice(i, 1)
        }
    }

    //lists users that have messaged
    users = []
    for(var i =0; i<jsonData.length; i++){
        if(jsonData[i].sender_id == user){
            if(!users.includes(jsonData[i].sentto_id)){
                users.push(jsonData[i].sentto_id)
            }
        }
        else{
            if(!users.includes(jsonData[i].sender_id)){
                users.push(jsonData[i].sender_id)
            }
        }
    }

    //displays message ui (change this to display name and pfp in future)
    text = ""
    for(var i = 0; i < users.length; i++){
        text += "<button onclick=loadmessagepage("+ users[i]+")>" + users[i] + "</button> <br>"
    }
    document.getElementById("message ui").innerHTML = text;

}


// this function is incomplete
async function loadmessages(otheruser){
    const response = await fetch(`${address}:${port}/messages/id=${user}&nextid=${otheruser}`  );
    const jsonData = await response.json();
    const usernames = await fetch(`${address}:${port}/users/id=${user}`);
    const otherusernames = await fetch(`${address}:${port}/users/id=${otheruser}`);
    const jsonusernames = await usernames.json()
    const jsonotherusernames = await otherusernames.json()
    username = jsonusernames[0].name
    otherusername = jsonotherusernames[0].name
    //clean through message data this is about as insecure as it gets please someone make this filter server side because any user could easily read any other users messages right now
    for(var i =0; i<jsonData.length; i++){
        console.log(jsonData[i])
        if ((jsonData[i].sender_id != user && jsonData[i].sentto_id != user)){
            jsonData.splice(i, 1)
        }

    }

    text = ""
    text += "<h>"+otherusername + "</h><br><br>"
    for(var i = 0; i<jsonData.length; i++){
        if(i>10){i=9999}
        if(jsonData[i].sender_id == user){
            text += "<p>"+ username + ":" + jsonData[i].content + "</p>"
        }

    }


    document.getElementById("message ui").innerHTML = text;
    console.log(jsonData)


}


async function sendmessage(event, message){
    event.preventdefault()
    console.log(message)

}

async function loadmessagepage(otheruser){
    console.log(otheruser)
    localStorage.setItem("otheruserid", otheruser)
    window.location.href="../views/viewmessages.html"
}


textresult = "example text"
document.getElementById("message ui").innerHTML = textresult;
window.onload = getdata()