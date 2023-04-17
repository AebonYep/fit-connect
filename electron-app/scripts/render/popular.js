const posts = [{
    "Title":"Gainz",
    "UserID":1,  
    "Content":"i have made sick gainz",
    "Tags":[
       "#gains",
       "#gym"
    ]
 },{"Title":"Gainz2 electric boogaloo",
 "UserID":1,  
 "Content":"i have made sick gainz",
 "Tags":[
    "#gains",
    "#gym"
 ]}];
 
 
   let text = "<div class = \"content\">"
     posts.forEach(func);
     text += "</div>"
 
     function func(post){
       text += "<h2>" + post.Title + "</h2>"
       text += "<p>" + post.Content + "</p>"
       text += "<small>" + post.Tags + "</small>"
       text += "<br>" + "<small>" + post.UserID + "</small>"
     }
 
     document.getElementById("posts").innerHTML = text;