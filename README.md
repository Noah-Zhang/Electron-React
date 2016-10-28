# 发布步骤
* 执行webpack
* index.html 将main.js改为bundle.js
* 注释require('babel-register');
* 删掉view的代码
* 执行`npm run-script package`,使用electron-packager打包程序。输出至`./electron-package-exe/xmltool-win32-x64`目录下
* `./electron-package-exe/`目录下`npm install`安装依赖（以下操作均基于`electron-package-exe/`目录）
* 手动添加`xml-writer`至`./xmltool-win32-x64/node_modules/`下。
* 执行`grunt`,打包为exe安装程序于`./installer/`。