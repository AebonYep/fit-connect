
localStorage.setItem("userID", 2)
window.onload = loadnotifs();
const notificationsParagraph = document.getElementById('notifications')
const notificationReadColour = "DodgerBlue";
const notificationNotReadColour = "Tomato;"

function pageLoaded(){
    console.log("page loaded.");
    const notifcations = grabdata();
    return;
    let notif = "<div class = \"content\">"; 
    for (var i = 0; i < notifcations.length; i++){
        notif += returnHtmlSetupForNotification(notifcations[i], i);
    }

    notificationsParagraph.innerHTML = notif;
}

async function grabdata() {
    let text = "";
    const response = await fetch("http://localhost:3000/posts");
    const jsonData = await response.json();
    return jsonData;
 }

function returnHtmlSetupForNotification(notification, index){
    let toReturn = "";
    let colour = "";
    if (notification.Read) {colour = notificationReadColour; } else { colour = notificationNotReadColour; }
    toReturn += "<p><b> Notification " + (index + 1) + "</b></p>" //this will say something like 'X has liked your post!' in the future but for now this
    toReturn += '<p style="color:' + colour + ';">' + notification.Contents + "</p>"
    return toReturn;
}


async function loadnotifs(){

    user = localStorage.getItem("userID")
    console.log("something random")
    const response = await fetch("http://lxfarm08.csc.liv.ac.uk:25565/messages");
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
        otheruser = jsonData[i].sentto_id
        const otherusernames = await fetch(`http://lxfarm08:25565/users/id=${otheruser}`);
        const jsonotherusernames = await otherusernames.json()
        text+="<a href=\"../views/messages.html\">New Message from "+ jsonotherusernames[0].name+ "   received: " + jsonData[i].sent.slice(10, 19).replace('T', ' ') + "</a><br>"
    }
    document.getElementById("notifications").innerHTML = text;


}