window.onload = pageLoaded;
const notificationsParagraph = document.getElementById('notifications')
function pageLoaded(){
    console.log("page loaded.");
    const notifcations = [{"Type":"normal", "Contents":"This is a test!"},{"Type":"normal", "Contents":"At some point this will display a bunch of notifications..."}];
    //Hard coding the notifications into the code, we will get this from sql at some point but for now...
    let notif = ""; 
    for (var i = 0; i < notifcations.length; i++){
        notif += notifcations[i].Contents + "<br>";
    }
    notificationsParagraph.innerHTML = notif;
}
