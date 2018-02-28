const db = require('../db/db');
function article(req, res) {
    if (req.body.action === 'writeblog') {
        writeBlog(req, res);
    }
    if (req.body.action === 'getArticle') {
        getArticle(req, res);
    }
    if (req.body.action === 'getdetail') {
        getDetail(req, res);
    }
    if (req.body.action === 'inrecycle') {
        inRecycle(req, res);
    }
    if (req.body.action === 'restore') {
        restore(req, res);
    }
    if (req.body.action === 'deepdel') {
        deepDelete(req, res);
    }
    if(req.body.action === 'admingetarticle'){
        adminGetArticle(req,res);
    }
}
function writeBlog(req, res) {
    console.log("in writeblog");
    var articleTitle = req.body.articleTitle;
    var article = req.body.article;
    var userid = req.body.userid;
    var uploadtime = req.body.uploadtime;
    if (req.body.location === 'submit') {
        console.log("submit");
        db(function (con) {
            var sql = 'insert into articlelist(userid,article_title,article_content,uploadtime,status) values(\'' + userid + '\',\'' + articleTitle + '\',\'' + article + '\',\'' + uploadtime + '\',\'0\');';
            con.query(sql, function (err, rows) {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log(rows);
                res.send("success");
            });
        }, 'blog');
    } else if (req.body.location === 'in-draft') {
        console.log("in-draft");
        db(function (con) {
            var sql = 'insert into articlelist(userid,article_title,article_content,uploadtime,status) values(\'' + userid + '\',\'' + articleTitle + '\',\'' + article + '\',\'' + uploadtime + '\',\'2\');';
            con.query(sql, function (err, rows) {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log(rows);
                res.send("success");
            });
        }, 'blog');
    } else if (req.body.location === 'editstatus') {
        console.log("in editstatus");
        var articleid = req.body.articleid;
        var articletitle = req.body.articletitle;
        var articlecontent = req.body.articlecontent;
        var uploadtime = req.body.uploadtime;
        db(function (con) {
            var sql = 'update articlelist set article_title="'+articletitle+'",article_content="'+articlecontent+'",uploadtime="'+uploadtime+'" where id='+articleid+';';
            con.query(sql, function (err, rows) {
                if (err) {
                    console.log(err);
                    return;
                }
                res.send("success");
            });
        },'blog');
    }
}
function getArticle(req, res) {
    console.log("in getArticle");
    if (req.body.location == "list-all") {
        db(function (con) {
            var sql = 'select * from articlelist where status in (1,2);';
            con.query(sql, function (err, rows) {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log(rows);
                res.send(rows);
            });
        }, 'blog');
    }
    if (req.body.location == "list-posted") {
        db(function (con) {
            var sql = 'select * from articlelist where status=1;';
            con.query(sql, function (err, rows) {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log(rows);
                res.send(rows);
            });
        }, 'blog');
    }
    if (req.body.location == "list-drafts") {
        db(function (con) {
            var sql = 'select * from articlelist where status=2;';
            con.query(sql, function (err, rows) {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log(rows);
                res.send(rows);
            });
        }, 'blog');
    } else if (req.body.location == "list-recycle") {
        db(function (con) {
            var sql = 'select * from articlelist where status=3;';
            con.query(sql, function (err, rows) {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log(rows);
                res.send(rows);
            });
        }, 'blog');
    }
}
function getDetail(req, res) {
    console.log("in get detail");
    var articleid = req.body.articleid;
    db(function (con) {
        var sql = 'select * from articlelist where id=' + articleid;
        con.query(sql, function (err, rows) {
            if (err) {
                console.log(err);
                return;
            }
            console.log(rows);
            res.send(rows);
        });
    }, 'blog');
}
function inRecycle(req, res) {
    console.log("in recycle");
    var articleid = req.body.articleid;
    db(function (con) {
        // var sql = 'update articlelist set status=3 where id='+articleid+";";
        var sql = 'select * from articlelist where id=' + articleid;
        con.query(sql, function (err, rows) {
            if (err) {
                console.log(err);
                return;
            }
            var original_status = rows[0].status;
            db(function () {
                var sql2 = 'update articlelist set status=3,original_status=' + original_status + ' where id=' + articleid + ';';
                con.query(sql2, function (err, rows2) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    console.log(rows);
                    var data = {
                        original_status: original_status,
                        result: "success"
                    }
                    res.send(data);
                });
            }, 'blog');
        });
    }, 'blog');
}
function restore(req, res) {
    var articleid = req.body.articleid;
    var status = req.body.original_status;
    db(function (con) {
        var sql = 'update articlelist set status=' + status + ' where id=' + articleid + ';';
        con.query(sql, function (err, rows) {
            if (err) {
                console.log(err);
                return;
            }
            console.log(rows);
            res.send("success");
        });
    }, 'blog');
}
function deepDelete(req, res) {
    console.log("in deepdelete");
    var articleid = req.body.articleid;
    db(function (con) {
        var sql = 'delete from articlelist where id=' + articleid + ';';
        con.query(sql, function (err, rows) {
            if (err) {
                console.log(err);
                return;
            }
            console.log(rows);
            res.send("success");
        });
    }, 'blog');
}
function adminGetArticle(req,res){
    db(function(con){
        var sql = 'select * from articlelist where status=0;';
        con.query(sql,function(err,rows){
            if(err){
                console.log(err);
                return;
            }
            res.send(rows);
        })
    },'blog');
}
module.exports = article;