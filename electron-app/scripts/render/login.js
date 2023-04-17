const { ipcRenderer } = require('electron')

// Store elements
const emailInput = document.getElementById('email-input')
const passwordInput = document.getElementById('password-input')
const loginBtn = document.getElementById('login-btn')


loginBtn.addEventListener('click', async () => {
    console.log('beans')
    let userData = [emailInput.value, passwordInput.value]
    var resp = await ipcRenderer.invoke('account:login', userData)


})
