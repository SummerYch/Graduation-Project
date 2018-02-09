const db = require('../db/db');
function User(req, res) {
    console.log(req.body);
    if (req.body.action === 'register') {
        register(req, res);
    }
    if (req.body.action === 'login') {
        login(req, res);
    }
}

function register(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    db(function (con) {
        var sql = 'select * from user where username=\'' + username + '\';';
        con.query(sql, function (err, rows) {
            if (err) {
                console.log(err);
                return;
            }
            // rows 是查询结果
            console.log(rows);
            if (rows.length !== 0) {
                console.log('不能被注册');
                res.send("failed");
                return;
            }
            else if (rows.length == 0) {
                console.log('可以被注册');
                db(function (con) {
                    var sql = 'insert into user(username,password) values(\'' + username + '\',\'' + password + '\');';
                    con.query(sql, function (err, rows) {
                        if (err) {
                            console.log(err);
                            return;
                        }
                        console.log(rows);
                    });
                }, 'blog');
                res.send("success");
            }
        });
    }, 'blog');
}

function login(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    db(function (con) {
        var sql = 'select * from user where username=\'' + username + '\';';
        con.query(sql, function (err, rows) {
            if (err) {
                console.log(err);
                return;
            }
            // rows 是查询结果
            if (rows.length == 0) {
                console.log('用户不存在');
                res.send("failed");
                return;
            }
            else if (rows.length !== 0) {
                console.log('用户存在');
                var pwd = rows[0].password;
                if (password == pwd) {
                    res.send("success");
                    return;
                }
                else {
                    res.send("password wrong");
                    return;
                }
            }
        });
    }, 'blog');
}
module.exports = User;