# 发布步骤
* 执行webpack
* index.html 将main.js改为bundle.js
* 注释require('babel-register');
* 删掉view的代码
* 提前安装electron-prebuilt $cnpm install -g electron-prebuilt
* electron-packager . app 
* 待续。。。。