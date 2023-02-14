import "reflect-metadata";

import { app, BrowserWindow, ipcMain } from 'electron';
import { DataSource } from "typeorm";

import { User } from '../entities/User';

const dataSource = new DataSource({
  type: 'sqlite',
  database: './public/db.sqlite3',
  entities: [User],
  synchronize: true,
  dropSchema: true,
});

dataSource.initialize().then(() => {
  console.log("Data Source has been initialized!")
}).catch((err) => {
  console.error("Error during Data Source initialization", err)
});

let mainWindow: BrowserWindow | null

declare const MAIN_WINDOW_WEBPACK_ENTRY: string
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string

// const assetsPath =
//   process.env.NODE_ENV === 'production'
//     ? process.resourcesPath
//     : app.getAppPath()

function createWindow () {
  mainWindow = new BrowserWindow({
    // icon: path.join(assetsPath, 'assets', 'icon.png'),
    width: 1100,
    height: 700,
    backgroundColor: '#191622',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY
    }
  })

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

async function registerListeners () {
  /**
   * This comes from bridge integration, check bridge.ts
   */
  // ipcMain.on('message', (_, message) => {
  //   console.log(message)
  // })
  
  ipcMain.on('sqlite-message', async (event, message) => {
    const user = await dataSource.getRepository(User).save({ firstName: 'Bernardo', lastName: 'Duarte', isActive: true });
    console.log(user);
    const users = await dataSource.getRepository(User).find();
    event.reply('sqlite-reply', users);
  });
}

app.on('ready', createWindow)
  .whenReady()
  .then(registerListeners)
  .catch(e => console.error(e))

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
