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
        notif += addHtml(notifcations[i]);
    }

    notificationsParagraph.innerHTML = notif;
}

function addHtml(notification){
    let toReturn = "";
    let colour = "Tomato";
    if (notification.Read) {colour = notificationReadColour; } else { colour = notificationNotReadColour; }
    //notification += "<h2>" + notification.Title + "</h2>"
    toReturn += '<p style="color:' + colour + ';">' + notification.Contents + "</p>"
    return toReturn;
}
