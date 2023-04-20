const user = 1; //this needs to be updated to grab the current user
const messagebutton = document.getElementById("messagebutton2")

async function getdata() {
    console.log("something random")
    const response = await fetch("http://lxfarm08.csc.liv.ac.uk:25565/messages");
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
        const otherusernames = await fetch(`http://lxfarm08:25565/users/id=${users[i]}`);
        const jsonotherusernames = await otherusernames.json()
        text += "<button onclick=loadmessagepage("+ users[i]+")>" + jsonotherusernames[0].name+ "</button> <br>"
    }
    document.getElementById("message ui").innerHTML = text;

}


// this function is incomplete
async function loadmessages(otheruser){
    const response = await fetch(`http://lxfarm08:25565/messages/id=${user}&nextid=${otheruser}`  );
    const jsonData = await response.json();
    const usernames = await fetch(`http://lxfarm08:25565/users/id=${user}`);
    const otherusernames = await fetch(`http://lxfarm08:25565/users/id=${otheruser}`);
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
    text += "<h>"+otherusername + "</h><br>"
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

messagebutton.addEventListener('click', async (event) => {
    event.preventDefault()  
    message = document.getElementById("messagebutton").value
    const otheruserids = await fetch(`http://lxfarm08:25565/users/name=${message}`);
    const otheruseridsjson = await otheruserids.json()
    console.log(otheruseridsjson)
    const otheruserid = otheruseridsjson[0].id
    loadmessagepage(otheruserid)

})

textresult = "example text"
document.getElementById("message ui").innerHTML = textresult;
window.onload = getdata()