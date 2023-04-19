const switchThemeButton = document.getElementById('switch')

switchThemeButton.addEventListener('click', () => {
    let theme = localStorage.getItem("theme")

    if (theme === "dark") {
        localStorage.setItem("theme", "light")
        document.getElementById('style-sheet').setAttribute('href', '../styles/lightStyles.css')
    }
    else if (theme === "light") {
        localStorage.setItem("theme", "dark")
        document.getElementById('style-sheet').setAttribute('href', '../styles/darkStyles.css')
    }
    console.log(localStorage.getItem("theme"))

})


function setTheme() {
    if (localStorage.getItem("themeLoaded") == null) {
        localStorage.setItem("theme", "light")
        localStorage.setItem("themeLoaded", true)
    }
    else if (localStorage.getItem("theme") === "dark") {
        console.log("dark")
        document.getElementById('style-sheet').setAttribute('href', '../styles/darkStyles.css')
    }
    else if (localStorage.getItem("theme") === "light") {
        console.log("light")
        document.getElementById('style-sheet').setAttribute('href', '../styles/lightStyles.css')
    }
}

window.onload = setTheme
