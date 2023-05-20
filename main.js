const { app, BrowserWindow } = require("electron");
const path = require("path");
const url = require("url");

function createWindow() {
  // Create the browser window
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      // contextIsolation: false,
      // enableRemoteModule: true,
    },
  });

  // Load the index.html file
  win.loadFile("index.html");

  win.webContents.on("dom-ready", () => {
    // Access the element by id
    win.webContents.executeJavaScript(
      `
      const myButton = document.getElementById('checkinBtn');
      if (myButton) {
        myButton.addEventListener('click', () => {
          const currentTime = new Date().toLocaleTimeString();
          let showCheckin = document.getElementById("showCheckin");
          showCheckin.innerHTML = currentTime;
          console.log('Button clicked!');
        });
      }
    `
    );

    // checkout button
    win.webContents.executeJavaScript(
      `
      const checkoutBtn = document.getElementById('checkoutBtn');
      if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
          const currentTime = new Date().toLocaleTimeString();
          let showCheckout = document.getElementById("showCheckout");
          showCheckout.innerHTML = currentTime;
          console.log('Button clicked!');
        });
      }
    `
    );

    // login logic
    win.webContents.executeJavaScript(
      `
      const submitBtn = document.getElementById('submitBtn');
      submitBtn.addEventListener('click',(e)=>{
        e.preventDefault();
        const name = document.getElementById('name').value;
        const password = document.getElementById('password').value;
        console.log(name,password)
        if (name==='admin' && password === 'admin') {
          console.log('pass')
          newWindow = new BrowserWindow({
            width: 800,
            height: 600,
            webPreferences: {
              nodeIntegration: true
            }
          });
    
          newWindow.loadFile('adminDashboard.html');
        }
      })
    `
    );
  });
}

// This method will be called when Electron has finished initialization
app.whenReady().then(createWindow);
