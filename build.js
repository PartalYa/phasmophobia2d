'use strict';
var packager = require('electron-packager');
var options = {
    'arch': 'ia32',
    'platform': 'win32',
    'dir': './',
    'app-copyright': 'PhasmoCorp',
    'app-version': '0.1.3',
    'asar': false,
    'icon': 'icon.ico',
    'name': 'Phasmophobia 2d',
    'out': './releases',
    'overwrite': true,
    'prune': true,
    'version': '0.1.3',
    'version-string': {
        'CompanyName': 'PhasmoCorp',
        'FileDescription': 'Phasmophobia2d',
        'OriginalFilename': 'Phasmophobia 2d',
        'ProductName': 'Phasmophobia 2d',
        'InternalName': 'phasmophobia2d'
    }
};
packager(options, function done_callback(err, appPaths) {
    console.log("Error: ", err);
    console.log("appPaths: ", appPaths);
});