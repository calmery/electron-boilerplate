import * as path from "path";
import * as url from "url";
import { BrowserWindow, app } from "electron";
import isDev from "electron-is-dev";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import electronNext from "electron-next";

app.on("ready", async () => {
  await electronNext("./renderer");

  const window = new BrowserWindow({
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: false,
    },
  });

  window.loadURL(
    isDev
      ? "http://localhost:8000/"
      : url.format({
          pathname: path.join(__dirname, "../renderer/index.html"),
          protocol: "file:",
          slashes: true,
        })
  );
});

app.on("window-all-closed", () => {
  app.quit();
});
