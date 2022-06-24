"use strict";
exports.__esModule = true;
var path = require("path");
// const readFileAsync = util.promisify(readFile);
// let index = await readFileAsync(path.join(__dirname, 'index.html'), 'utf8');
// index = index.replace('SOMETHING', 'SOMETHING ELSE'); //MODIFY THE FILE AS A STRING HERE
// res.send(index);
console.log(path.join(__dirname, '../out/index.html'));
/*
fs.readFile(path.join(__dirname, "../out/index.html"), (err, data) => {
  if (err) throw err.message;

  console.log(data);
})
*/
