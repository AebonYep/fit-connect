const switchThemeBtn = document.getElementById('switch')

switchThemeBtn.addEventListener('click', () => {
    if (document.getElementById('theme').href == "darkStyles.css") {
        document.getElementById('theme').href = "styles.css";
      } else {
        document.getElementById('theme').href = "darkStyles.css";
      }
    
})