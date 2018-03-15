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
    if (req.body.action === 'admingetarticle') {
        adminGetArticle(req, res);
    }
    if (req.body.action === 'articlepass') {
        articlePass(req, res);
    }
    if (req.body.action === 'articlenotpass') {
        articleNotPass(req, res);
    }
    if (req.body.action === 'indexgetarticle') {
        indexGetArticle(req, res);
    }
    if (req.body.action === 'getuser') {
        getUser(req, res);
    }
    if (req.body.action == 'gethimarticle') {
        getHimArticle(req, res);
    }
    if (req.body.action == 'addcollect') {
        addCollect(req, res);
    }
    if (req.body.action == 'ifcollected') {
        ifCollected(req, res);
    }
    if (req.body.action == 'cancelcollect') {
        console.log("###################3");
        cancelCollection(req, res);
    }
    if (req.body.action == 'geticollect') {
        getICollect(req, res);
    }
}

function writeBlog(req, res) {
    console.log("in writeblog");
    var articleTitle = req.body.articleTitle;
    var article = req.body.article;
    var userid = req.body.userid;
    var username = req.body.username;
    var uploadtime = req.body.uploadtime;
    if (req.body.location === 'submit') {
        console.log("submit");
        db(function (con) {
            var sql = 'insert into articlelist(userid,username,article_title,article_content,uploadtime,status) values(\'' + userid + '\',\'' + username + '\',\'' + articleTitle + '\',\'' + article + '\',\'' + uploadtime + '\',\'0\');';
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
            var sql = 'update articlelist set article_title="' + articletitle + '",article_content="' + articlecontent + '",uploadtime="' + uploadtime + '" where id=' + articleid + ';';
            con.query(sql, function (err, rows) {
                if (err) {
                    console.log(err);
                    return;
                }
                res.send("success");
            });
        }, 'blog');
    }
}

function getArticle(req, res) {
    console.log("in getArticle");
    var userid = req.body.userid;
    if (req.body.location == "list-all") {
        db(function (con) {
            var sql = 'select * from articlelist where userid=' + userid + ' and (status=1 or status=2);';
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
            var sql = 'select * from articlelist where userid=' + userid + ' and status=1;';
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
            var sql = 'select * from articlelist where userid=' + userid + ' and status=2;';
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
            var sql = 'select * from articlelist where userid=' + userid + ' and status=3;';
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

function adminGetArticle(req, res) {
    db(function (con) {
        var sql = 'select * from articlelist where status=0;';
        con.query(sql, function (err, rows) {
            if (err) {
                console.log(err);
                return;
            }
            res.send(rows);
        })
    }, 'blog');
}

function articlePass(req, res) {
    var articleid = req.body.articleid;
    db(function (con) {
        var sql = 'update articlelist set status="1" where id=' + articleid + ';';
        con.query(sql, function (err, rows) {
            if (err) {
                console.log(err);
                return;
            }
            res.send("success");
        });
    }, 'blog');
}

function articleNotPass(req, res) {
    console.log("2");
    var articleid = req.body.articleid;
    db(function (con) {
        var sql = 'update articlelist set status="-1" where id=' + articleid + ';';
        con.query(sql, function (err, rows) {
            if (err) {
                console.log(err);
                return;
            }
            res.send("success");
        });
    }, 'blog');
}

function indexGetArticle(req, res) {
    db(function (con) {
        var sql = 'select * from articlelist where status=1;';
        con.query(sql, function (err, rows) {
            if (err) {
                console.log(err);
                return;
            }
            res.send(rows);
        });
    }, 'blog');
}

function getUser(req, res) {
    var articleid = req.body.articleid;
    db(function (con) {
        var sql = 'select * from articlelist where id=' + articleid + ';';
        con.query(sql, function (err, rows) {
            if (err) {
                console.log(err);
            }
            res.send(rows);
        });
    }, 'blog');
}

function getHimArticle(req, res) {
    var himid = req.body.himid;
    db(function (con) {
        var sql = 'select * from articlelist where id=' + himid + ';';
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

function addCollect(req, res) {
    var userid = req.body.userid;
    var username = req.body.username;
    var articleid = req.body.articleid;
    db(function (con) {
        var sql = 'insert into articlecollection(collecterid,collectername,articleid) values(\'' + userid + '\',\'' + username + '\',\'' + articleid + '\');';
        con.query(sql, function (err, rows) {
            if (err) {
                console.log(err);
                return;
            }
            res.send("success");
        })
    }, 'blog');
}

function ifCollected(req, res) {
    console.log("now in ifcollected");
    var collecterid = req.body.collecterid;
    var articleid = req.body.articleid;
    db(function (con) {
        var sql = 'select * from articlecollection where collecterid=' + collecterid + ' and articleid=' + articleid + ';';
        con.query(sql, function (err, rows) {
            if (err) {
                console.log(err);
                return;
            }
            res.send(rows);
        });
    }, 'blog');
}

function cancelCollection(req, res) {
    console.log("now in cancelcollection");
    var collecterid = req.body.userid;
    var articleid = req.body.articleid;
    db(function (con) {
        var sql = 'delete from articlecollection where collecterid=' + collecterid + ' and articleid=' + articleid + ';';
        con.query(sql, function (err, rows) {
            if (err) {
                console.log(err);
                return;
            }
            res.send("success");
        })
    }, 'blog');
}

function getICollect(req, res) {
    var userid = req.body.userid;
    db(function (con) {
        var sql = 'select * from articlecollection where collecterid=' + userid + ';';
        con.query(sql, function (err, rows) {
            if (err) {
                console.log(err);
                return;
            }
            var article = [];
            var l = rows.length;
            for (var i = 0; i < rows.length; i++) {
                byCollectionGetArticle(function (rows, res, l) {
                    article.push(rows[0]);
                    if (article.length == l) {
                        res.send(article);
                    }
                }, rows[i].articleid, res, l);
            }
        });
    }, 'blog');
}

function byCollectionGetArticle(cb, id, res, l) {
    db(function (con) {
        var sql = 'select * from articlelist where id=' + id + ';';
        con.query(sql, function (err, rows) {
            if (err) {
                console.log(err);
                return;
            }
            cb(rows, res, l);
        });
    }, 'blog');
}

module.exports = article;