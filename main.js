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
  mainWindow = new BrowserWindow({width: 940, height: 650});
  mainWindow.loadURL('file://' + __dirname + '/index.html');
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});


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

  fs.writeFile("output.txt",xw.toString());

  event.returnValue = "200";
  event.sender.send('asynchronous-reply', '200')
});