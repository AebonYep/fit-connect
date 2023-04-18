window.onload = pageLoaded;
const notificationsParagraph = document.getElementById('notifications')
const notificationReadColour = "DodgerBlue";
const notificationNotReadColour = "Tomato;"
function pageLoaded(){
    console.log("page loaded.");
    const notifcations = [{"Type":"normal", "Contents":"Notification read test", "Read":true},{"Type":"normal", "Contents":"Notification not read test", "Read":false}];
    //Hard coding the notifications into the code, we will get this from sql at some point but for now...
    let notif = "<div class = \"content\">"; 
    for (var i = 0; i < notifcations.length; i++){
        notif += returnHtmlSetupForNotification(notifcations[i], i);
    }

    notificationsParagraph.innerHTML = notif;
}

function returnHtmlSetupForNotification(notification, index){
    let toReturn = "";
    let colour = "";
    if (notification.Read) {colour = notificationReadColour; } else { colour = notificationNotReadColour; }
    toReturn += "<p><b> Notification " + (index + 1) + "</b></p>" //this will say something like 'X has liked your post!' in the future but for now this
    toReturn += '<p style="color:' + colour + ';">' + notification.Contents + "</p>"
    return toReturn;
}