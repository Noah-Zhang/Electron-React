import { app, BrowserWindow,ipcMain } from 'electron';

var XMLWriter = require('xml-writer');
const os = require('os');
const fs = require('fs');



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
      xw.startElement('ID');
      xw.text(arg.ID);
      xw.endElement('ID');

      xw.startElement('name');
      xw.text(arg.name);
      xw.endElement('name');

      xw.startElement('level');
      xw.text(arg.level);
      xw.endElement('level');

      xw.startElement('datetime');
      xw.text(arg.datetime._d);
      xw.endElement('datetime');

      xw.startElement('fileName');
      xw.text(arg.fileName);
      xw.endElement('fileName');

      xw.startElement('SRID');
      xw.text(arg.SRID);
      xw.endElement('SRID');

    xw.endElement('basic');

    xw.startElement('extend');
      xw.startElement('department');
      xw.text(arg.department);
      xw.endElement('department');

    //   xw.startElement('contact');
    //   xw.text(arg.contact);
    //   xw.endElement('contact');

    //   xw.startElement('phone');
    //   xw.text(arg.phone);
    //   xw.endElement('phone');

    //   xw.startElement('description');
    //   xw.text(arg.description);
    //   xw.endElement('description');

    //   xw.startElement('thumbnail');
    //   xw.text(arg.thumbnail);
    //   xw.endElement('thumbnail');

    //   xw.startElement('picture');
    //   xw.text(arg.picture);
    //   xw.endElement('picture');

    // xw.endElement('extend');

  xw.endElement('root');
  xw.endDocument();
  fs.writeFile("output.xml",xw.toString());


  //保存此次配置文件
  let config = {
    'name':arg.name,
    'fileName':arg.fileName,
    'department':arg.department,
    'contact':arg.contact,
    'phone':arg.phone
  };
  fs.writeFile("config.json",JSON.stringify(config));


  event.returnValue = "200";
  event.sender.send('asynchronous-reply', '200')
});