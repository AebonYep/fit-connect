function setServer(){
    localStorage.setItem("address", "http://lxfarm08.csc.liv.ac.uk")
    localStorage.setItem("port", 25565)  
}

window.onload = setServer