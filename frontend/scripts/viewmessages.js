const address = localStorage.getItem("address")
const port = localStorage.getItem("port")

const messagebutton = document.getElementById("messagebutton2")

async function loadmessages() {
    otheruser = localStorage.getItem("otheruserid")
    user = localStorage.getItem("userID")

    const response = await fetch(`${address}:${port}/messages/id=${user}&nextid=${otheruser}`);
    const jsonData = await response.json();
    const usernames = await fetch(`${address}:${port}/users/id=${user}`);
    const otherusernames = await fetch(`${address}:${port}/users/id=${otheruser}`);
    const jsonusernames = await usernames.json()
    const jsonotherusernames = await otherusernames.json()
    username = jsonusernames[0].name
    otherusername = jsonotherusernames[0].name
    //clean through message data this is about as insecure as it gets please someone make this filter server side because any user could easily read any other users messages right now
    for (var i = 0; i < jsonData.length; i++) {
        console.log(jsonData[i])
        if ((jsonData[i].sender_id != user && jsonData[i].sentto_id != user)) {
            jsonData.splice(i, 1)
        }

    }

    text = ""
    text += "<h>" + otherusername + "</h><br><br>"
    for (var i = 0; i < jsonData.length; i++) {
        //if (i > 10) { i = 9999 }
        if (jsonData[i].sender_id == user) {
            text += "<p>" + username + ":" + jsonData[i].content + "</p>"
        }else{
            text += "<p>" + otherusername + ":" + jsonData[i].content + "</p>"
        }

    }


    document.getElementById("viewmessage").innerHTML = text;
    console.log(jsonData)


}

async function sendmessage(event, message) {
    event.preventdefault()
    console.log(message)

}

messagebutton.addEventListener('click', async (event) => {
    message = document.getElementById("messagebutton").value
    console.log(localStorage.getItem("otheruserid"))
    console.log(message)

    let jsonData = {
        userid: localStorage.getItem("userID"),
        otheruserid: localStorage.getItem("otheruserid"),
        content: message
    }
   let response = await fetch(`${address}:${port}/messages/create`, {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(jsonData)
    })


})

textresult = "example text"
window.onload = loadmessages()
document.getElementById("viewmessage").innerHTML = textresult;