const { app, BrowserWindow } = require('electron')
const { execSync, spawn } = require('child_process');
function createWindow() {
  // 创建浏览器窗口
  const win = new BrowserWindow({
    width: 1024,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })
  // console.log(execSync('ls'));
  // const ls = spawn('ls', ['-l']);
  const ls = spawn('node', ['./node_modules/whistle/bin/whistle.js', 'start', '-p', '8898']);

  ls.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });
  ls.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });
  ls.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });


  // 并且为你的应用加载index.html
  // win.loadFile('index.html')

    win.loadURL('http://localhost:8898')
    // 打开开发者工具
    win.webContents.openDevTools();
}

// Electron会在初始化完成并且准备好创建浏览器窗口时调用这个方法
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(createWindow)

//当所有窗口都被关闭后退出
app.on('window-all-closed', () => {
  // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
  // 否则绝大部分应用及其菜单栏会保持激活。
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // 在macOS上，当单击dock图标并且没有其他窗口打开时，
  // 通常在应用程序中重新创建一个窗口。
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})