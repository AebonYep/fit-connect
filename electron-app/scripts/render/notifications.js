window.onload = pageLoaded;
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
    const response = await fetch("http://lxfarm08.csc.liv.ac.uk:3000/posts");
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