const electron = require('electron');
const XMLWriter = require('xml-writer');
const os = require('os');
const fs = require('fs');
const path = require('path');

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipcMain = electron.ipcMain;
const dialog = electron.dialog;

var handleStartupEvent = function () {
  if (process.platform !== 'win32') {
    return false;
  }

  var squirrelCommand = process.argv[1];

  switch (squirrelCommand) {
    case '--squirrel-install':
    case '--squirrel-updated':
      install();
      return true;
    case '--squirrel-uninstall':
      uninstall();
      app.quit();
      return true;
    case '--squirrel-obsolete':
      app.quit();
      return true;
  }
    // 安装
  function install() {
    var cp = require('child_process');    
    var updateDotExe = path.resolve(path.dirname(process.execPath), '..', 'update.exe');
    var target = path.basename(process.execPath);
    var child = cp.spawn(updateDotExe, ["--createShortcut", target], { detached: true });
    child.on('close', function(code) {
        app.quit();
    });
  }
   // 卸载
   function uninstall() {
    var cp = require('child_process');    
    var updateDotExe = path.resolve(path.dirname(process.execPath), '..', 'update.exe');
    var target = path.basename(process.execPath);
    var child = cp.spawn(updateDotExe, ["--removeShortcut", target], { detached: true });
    child.on('close', function(code) {
        app.quit();
    });
  }

};

if (handleStartupEvent()) {
  return;
}

let mainWindow = null;

app.on('window-all-closed', () => {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', () => {
  mainWindow = new BrowserWindow({width: 940, height: 630,autoHideMenuBar:true});
  mainWindow.loadURL('file://' + __dirname + '/index.html');
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});

//获取配置文件
ipcMain.on('getConfig', function (event, arg) {

  fs.readFile('./config.json', function(err,data){
    if (err){
      event.returnValue = "404";
      event.sender.send('returnConfig', "notFound");
    }else{
      let jsonObj=JSON.parse(data);
      event.returnValue = "200";
      event.sender.send('returnConfig', jsonObj);
    }
  });

});



//写入XML文件
ipcMain.on('synchronous-message', function (event, arg) {

  var xw = new XMLWriter(true);
  xw.startDocument();
  xw.startElement('root');
    xw.startElement('basic');
      xw.startElement('theme');
      xw.text(arg.theme);
      xw.endElement('theme');

      xw.startElement('name');
      xw.text(arg.name);
      xw.endElement('name');

      xw.startElement('level');
      xw.text(arg.level);
      xw.endElement('level');

      xw.startElement('datetime');
      xw.text(arg.datetime._d);
      xw.endElement('datetime');

      let countFileName = arg.fileName.fileList.length;
      for(var i=0;i<countFileName;i++){
        xw.startElement('fileName');
        xw.text(arg.fileName.fileList[i].name);
        xw.endElement('fileName');
      }

      xw.startElement('SRID');
      xw.text(arg.SRID);
      xw.endElement('SRID');

    xw.endElement('basic');

    xw.startElement('extend');
      xw.startElement('department');
      xw.text(arg.department);
      xw.endElement('department');

      xw.startElement('contact');
      xw.text(arg.contact);
      xw.endElement('contact');

      xw.startElement('phone');
      xw.text(arg.phone);
      xw.endElement('phone');

      if(arg.description){
        xw.startElement('description');
        xw.text(arg.description);
        xw.endElement('description');
      }


      if(arg.thumbnail){
        let countThumbnail = arg.thumbnail.fileList.length;
        for(var i=0;i<countThumbnail;i++){
          xw.startElement('thumbnail');
          xw.text(arg.thumbnail.fileList[i].name);
          xw.endElement('thumbnail');
        }
      }
      if(arg.picture){
        let countPicture = arg.picture.fileList.length;
        for(var i=0;i<countPicture;i++){
          xw.startElement('picture');
          xw.text(arg.picture.fileList[i].name);
          xw.endElement('picture');
        }
      }


    xw.endElement('extend');

  xw.endElement('root');
  xw.endDocument();

  dialog.showOpenDialog({
    properties:['openDirectory']
  },function(files){
    fs.writeFile(files+"\\"+arg.name+".xml",xw.toString());
  });


  //保存此次配置文件
  let config = {
    'theme':arg.theme,
    'level':arg.level,
    'SRID':arg.SRID,
    'department':arg.department,
    'contact':arg.contact,
    'phone':arg.phone,
  };
  fs.writeFile("config.json",JSON.stringify(config));


  event.returnValue = "200";
  event.sender.send('asynchronous-reply', '200')
});