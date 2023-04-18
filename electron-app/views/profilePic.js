function test(){

    alert("test")
    
    }

$("#profileImage").click(function(e) {
    $("#imageUpload").click();
});

function fasterPreview( uploader ) {
    if ( uploader.files && uploader.files[0] ){
          $('#profileImage').attr('src', 
             window.URL.createObjectURL(uploader.files[0]) );
    }
}

$("#imageUpload").change(function(){
    fasterPreview( this );
});

var profile = {
    "UserID":1,
    "Bio": "Example bio", 
    //"Images:[] -- just fill with example for images for now should be filled with images uploaded by user"
 };
 
 
   /*let text = "<div class = \"content\">"
     posts.forEach(func);
     text += "</div>"
 
     function func(post){
       text += "<h2>" + post.Title + "</h2>"
       /*text += "<img src="+ Images/example01.jpg +"> </img>" 
       something similar to this should work
       text += "<p>" + post.Content + "</p>"
       text += "<small>" + post.Tags + "</small>"
       text += "<br>" + "<small>" + post.UserID + "</small>"
       text+= "<br><br>"
     }
 
     document.getElementById("profile").innerHTML = text;
     */
