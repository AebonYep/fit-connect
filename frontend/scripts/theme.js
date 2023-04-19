const switchThemeButton = document.getElementById('switch')

switchThemeButton.addEventListener('click', () => {
    switchTheme()
    let theme = localStorage.getItem("currentTheme")
    if(theme === "light"){
	localStorage.setItem("currentTheme", "dark")
    }
    if(theme === "dark"){
	localStorage.setItem("currentTheme", "light")
    }
})

function switchTheme(){

    let theme = localStorage.getItem("currentTheme")
    console.log(theme)

    if(theme == null){
	theme = "light"
    }
    if(theme === "dark"){
	document.getElementById('style-sheet').setAttribute('href', 'darkStyles.css')	
    }
    if(theme === "light"){
	document.getElementById('style-sheet').setAttribute('href', 'lightStyles.css')	
    }
}

window.onload = switchTheme
