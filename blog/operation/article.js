const db = require('../db/db');
function article(req, res) {
    if (req.body.action === 'writeblog') {
        writeBlog(req, res);
    }
    if (req.body.action === 'getArticle') {
        getArticle(req, res);
    }
}
function writeBlog(req, res) {
    console.log("in writeblog");
    var articleTitle = req.body.articleTitle;
    var article = req.body.article;
    var userid = req.body.userid;
    var uploadtime = req.body.uploadtime;
    db(function (con) {
        var sql = 'insert into articlelist(userid,article_title,article_content,uploadtime,status) values(\''+userid+'\',\''+articleTitle+'\',\''+article+'\',\''+uploadtime+'\',\'0\');';
        con.query(sql,function(err,rows){
            if(err){
                console.log(err);
                return;
            }
            console.log(rows);
            res.send("success");
        });
    }, 'blog');
}
function getArticle(req,res){
    console.log("in getArticle");
    if(req.body.location == "list-all"){
        db(function(con){
            var sql = 'select * from articlelist where status in (1,2);';
            con.query(sql,function(err,rows){
                if(err){
                    console.log(err);
                    return;
                }
                console.log(rows);
                res.send(rows);
            });
        },'blog');
    }
    if(req.body.location == "list-posted"){
        db(function(con){
            var sql = 'select * from articlelist where status=1;';
            con.query(sql,function(err,rows){
                if(err){
                    console.log(err);
                    return;
                }
                console.log(rows);
                res.send(rows);
            });
        },'blog');
    }
    if(req.body.location == "list-drafts"){
        db(function(con){
            var sql = 'select * from articlelist where status=2;';
            con.query(sql,function(err,rows){
                if(err){
                    console.log(err);
                    return;
                }
                console.log(rows);
                res.send(rows);
            });
        },'blog');
    }else if(req.body.location == "list-recycle"){
        db(function(con){
            var sql = 'select * from articlelist where status=3;';
            con.query(sql,function(err,rows){
                if(err){
                    console.log(err);
                    return;
                }
                console.log(rows);
                res.send(rows);
            });
        },'blog');
    }
}
module.exports = article;