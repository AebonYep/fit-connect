const address = localStorage.getItem("address")
const port = localStorage.getItem("port")

var posts;


async function grabdata() {
   let text = "";
   // CHANGE LINK TO VARIABLE THAT IS GLOBAL IN CODEBASE
   const response = await fetch(`${address}:${port}/posts`);
   const jsonData = await response.json();
   text += "<div class = \"content\">"
   for (var i = 0; i<jsonData.length; i++) {
      text += func(jsonData[i], text)
  }
   text += "</div>"
   document.getElementById("posts").innerHTML = text;
   return text
}



function func(post) {
   let text = ""
   if(post.type == "text"){
   text += "<h2>" + post.title + "</h2>"
   /*text += "<img src="+ Images/example01.jpg +"> </img>" 
   something similar to this should work*/
   text += "<p>" + post.content + "</p>"
   text += "<small>" + post.tags + "</small>"
   //text += "<br>" + "<small>" + post.UserID + "</small>"
   text += "<br><br>"
   }
   else if (post.type == "image"){
      text += "<h2>" + post.title + "</h2>"
   text += "<img src="+ post.content +"> </img>" 
   text += "<small>" + post.tags + "</small>"
   //text += "<br>" + "<small>" + post.UserID + "</small>"
   text += "<br><br>"
   }
   return text
}
let textresult = grabdata()
document.getElementById("posts").innerHTML = textresult;
