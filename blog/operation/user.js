const db = require('../db/db');
var cb = require('../cb/cb');

function User(req,res){
    console.log(req.body);
    if(req.body.action == 'register'){
        register(req,res);
    }
}

function register(req,res){
    console.log('1');
    var username = req.body.username;
    var password = req.body.password;
    db(function (con) {
        console.log("2");
        var sql = 'insert into user(username,password) values('+username+','+password+');';
        con.query(sql, cb(function (result) {
          if(result.length !== 0){
              console.log("insert success");
          }
        }));
      }, 'blog');
}

module.exports = User;