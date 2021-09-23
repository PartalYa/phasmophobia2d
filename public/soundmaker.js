'use strict'
const fs = require('fs');
const Str = require('@supercharge/strings')
let playlist = [];
let txt;
const testFolder = './sounds';

fs.readdir(testFolder, (err, files) => {
  files.forEach(file => {
	console.log("'./sounds/"+file+"',")
	playlist.push('sounds/'+file);
	
  });
});
