var mysql = require('mysql');
var callback = require('../cb/cb');

var init = function (cb, db) {
  var options = {
    host: localhost,
    user: 'root',
    password: '123456'
  };
  if (db) {
    options.database = db;
  }
  var con = mysql.createConnection(options);
  con.connect(callback(function () {
    console.log('connected');
    cb instanceof Function && cb(con);
  }));
};
module.exports = init;

