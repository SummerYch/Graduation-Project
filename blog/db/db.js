var mysql = require('mysql');

var init = function (cb,db) {
  var options = {
    host: 'localhost',
    user: 'root',
    password: '123456',
    database:db
  };
  var con = mysql.createConnection(options);
  con.connect(function(err){
    if(err){
      console.log(err);
      return;
    }
    console.log('connected success');
    cb(con);
  });
};
module.exports = init;

