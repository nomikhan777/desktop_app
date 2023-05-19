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
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });

  // Load the index.html file
  win.loadURL(
    url.format({
      pathname: path.join(__dirname, "index.html"),
      protocol: "file:",
      slashes: true,
    })
  );
}

// This method will be called when Electron has finished initialization
app.whenReady().then(createWindow);

function showCheckin() {
  let checkinBtn = document.getElementById("checkinBtn");
  checkinBtn.addEventListener("click", () => {
    const currentTime = new Date().toLocaleTimeString();
    let showCheckin = document.getElementById("showCheckin");
    showCheckin.innerHTML = currentTime;
  });
  console.log("clicked");
  //   let checkinTime = document.getElementById("checkin_time");
}
