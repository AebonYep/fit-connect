function setServer(){
    localStorage.setItem("address", "http://localhost")
    localStorage.setItem("port", 3000)  
}

window.onload = setServer