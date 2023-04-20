const address = localStorage.getItem("address")
const port = localStorage.getItem("port")

const user = localStorage.getItem("userID"); //this needs to be updated to grab the current user
const messagebutton = document.getElementById("messagebutton2")

async function getdata() {
    console.log("something random")
    const response = await fetch(`${address}:${port}/messages`);
    console.log(response.status)
    var jsonData = await response.json();
    console.log(jsonData)
    //clean through message data this is about as insecure as it gets please someone make this filter server side because any user could easily read any other users messages right now
    for(var i =0; i<jsonData.length; i++){
        if (jsonData[i].sender_id != user && jsonData[i].sentto_id != user){
            jsonData = jsonData.splice(i, 1)
        }
    }
    console.log(jsonData)
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
    console.log(users)
    //displays message ui (change this to display name and pfp in future)
    
    text = ""
    for(var i = 0; i < users.length; i++){
        try{
        const otherusernames = await fetch(`${address}:${port}/users/id=${users[i]}`);
        const jsonotherusernames = await otherusernames.json()
        //text += "<button onclick=loadmessagepage("+ users[i]+")>" + jsonotherusernames[0].name+ "</button> <br>"
        }catch{

        }

    }
    console.log(text)
    document.getElementById("message ui").innerHTML = text;

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
    const otheruserids = await fetch(`${address}:${port}/users/name=${message}`);
    const otheruseridsjson = await otheruserids.json()
    console.log(otheruseridsjson)
    const otheruserid = otheruseridsjson[0].id
    loadmessagepage(otheruserid)

})

textresult = "no messages"
document.getElementById("message ui").innerHTML = textresult;
window.onload = getdata()