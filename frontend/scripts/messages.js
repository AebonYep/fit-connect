const user = 2; //this needs to be updated to grab the current user

async function getdata() {
    const response = await fetch("http://lxfarm08.csc.liv.ac.uk:25565/messages");
    const jsonData = await response.json();
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
        text += "<button onclick=loadmessages("+ users[i] +")>" + users[i] + "</button> <br>"
    }
    document.getElementById("message ui").innerHTML = text;

    console.log(jsonData)
    console.log(users)
}


// this function is incomplete
async function loadmessages(otheruser){
    const response = await fetch("http://lxfarm08.csc.liv.ac.uk:25565/messages");
    const jsonData = await response.json();
    console.log(jsonData)
    //clean through message data this is about as insecure as it gets please someone make this filter server side because any user could easily read any other users messages right now
    for(var i =0; i<jsonData.length; i++){
        console.log(jsonData[i])
        if ((jsonData[i].sender_id != user && jsonData[i].sentto_id != user) || (jsonData[i].sender_id != otheruser && jsonData[i].sentto_id != otheruser)){
            jsonData.splice(i, 1)
        }

    }

    console.log(jsonData)


}


window.onload = getdata
textresult = "example text"
document.getElementById("message ui").innerHTML = textresult;