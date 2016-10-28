var grunt = require("grunt");
grunt.config.init({
    pkg: grunt.file.readJSON('package.json'),
    'create-windows-installer': {
        x64: {
            appDirectory: './xmltool-win32-x64',
            authors: 'IECAS',
            exe: 'xmltool.exe',
            description:"xml generator tool by IECAS",
            iconUrl:'http://ob9a4nwxa.bkt.clouddn.com/icon.ico',
			setupIcon:'icon.ico',
			noMsi:true
        }       
    }
})

grunt.loadNpmTasks('grunt-electron-installer');
grunt.registerTask('default', ['create-windows-installer']);
