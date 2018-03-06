const db = require('../db/db');
function User(req, res) {
    console.log(req.body);
    if (req.body.action === 'register') {
        register(req, res);
    }
    if (req.body.action === 'login') {
        login(req, res);
    }
    if (req.body.action === 'user_info') {
        userInfo(req, res);
    }
    if (req.body.action === 'getUserInfo') {
        getUserInfo(req, res);
    }
    if(req.body.action === 'addattention'){
        addAttention(req,res);
    }
    if(req.body.action === 'ifattention'){
        ifAttention(req,res);
    }
    if(req.body.action === 'cancelattention'){
        cancelAttention(req,res);
    }
}
// 注册
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

// 登录
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
                    var userid = rows[0].id;
                    res.send({
                        loginerId: userid,
                        loginerName: username,
                        status: "success"
                    });
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
//录入用户信息
function userInfo(req, res) {
    var userid = req.body.userid;
    var occupation = req.body.occupation;
    var name = req.body.name;
    var country = req.body.country;
    var sex = req.body.sex;
    var birthday = req.body.birthday;
    var self_intro = req.body.self_intro;
    db(function (con) {
        var sql = 'select * from user_info where userid=\'' + userid + '\';';
        con.query(sql, function (err, rows) {
            if (err) {
                console.log(err);
                return;
            }
            // rows 是查询结果
            if (rows.length == 0) {
                console.log("用户第一次编辑个人信息");
                db(function (con) {
                    // var sql = 'insert into user_info(userid,occupation,name,country,sex,birthday,self-intro) values(\''+userid+'\',\''+occupation+'\',\''+name+'\',\''+country+'\',\''+sex+'\',\''+birthday+'\',\''+self_intro+'\');';
                    var sql = 'insert into user_info(userid,occupation,name,country,sex,birthday,self_intro) values (\'' + userid + '\',\'' + occupation + '\',\'' + name + '\',\'' + country + '\',\'' + sex + '\',\'' + birthday + '\',\'' + self_intro + '\');';
                    con.query(sql, function (err, rows) {
                        if (err) {
                            console.log(err);
                            res.send("failed");
                            return;
                        }
                        // rows 是查询结果
                        console.log(rows);
                        res.send("success");
                    });
                }, 'blog');
                return;
            }
            else if (rows.length !== 0) {
                console.log("用户修改个人信息");
                db(function (con) {
                    var sql = 'update user_info set occupation=\'' + occupation + '\',name=\'' + name + '\',country=\'' + country + '\','
                        + 'sex=\'' + sex + '\',birthday=\'' + birthday + '\',self_intro=\'' + self_intro + '\' where userid=' + userid + ';';
                    con.query(sql, function (err, rows) {
                        if (err) {
                            console.log(err);
                            res.send("failed");
                            return;
                        }
                        // rows 是查询结果
                        console.log(rows);
                        res.send("success");
                    });
                }, 'blog');
            }
        });
    }, 'blog');
}
//获取用户信息
function getUserInfo(req, res) {
    console.log("now at getUserInfo");
    var userid = req.body.userid;
    db(function (con) {
        var sql = 'select * from user_info where userid=\'' + userid + '\';';
        con.query(sql, function (err, rows) {
            if (err) {
                console.log(err);
                return;
            }
            // rows 是查询结果
            console.log(rows);
            res.send(rows[0]);
        });
    }, 'blog');
}
//添加关注
function addAttention(req,res){
    console.log("now at addattention");
    var followingid = req.body.userid;
    var followedid = req.body.followedid;
    db(function(con){
        var sql = 'insert into followlist(followingid,followedid) values (\''+followingid+'\',\''+followedid+'\');';
        con.query(sql,function(err,rows){
            if(err){
                console.log(err);
                return;
            }
            res.send("add");
        })
    },'blog');
}
function ifAttention(req,res){
    var followingid = req.body.userid;
    var followedid = req.body.followedid;
    db(function(con){
        var sql = 'select * from followlist where followingid='+followingid+' and followedid='+followedid+';';
        con.query(sql,function(err,rows){
           if(err){
               console.log(err);
           }
           res.send(rows);
        });
    },'blog');
}
function cancelAttention(req,res){
    var followingid = req.body.userid;
    var followedid = req.body.followedid;
    db(function(con){
        var sql = 'delete from followlist where followingid='+followingid+' and followedid='+followedid+';';
        con.query(sql,function(err,rows){
            if(err){
                console.log(err);
            }
            res.send("cancel");
        });
    },'blog');
}
module.exports = User;