const db = require('../db/db');
function comment(req,res) {
    if(req.body.action == 'articlecomment'){
        articleComment(req,res);
    }
    if(req.body.action == 'getcomment'){
        getComment(req,res);
    }
}
function articleComment(req,res){
    var commenterid = req.body.userid;
    var commentername = req.body.username;
    var articleid = req.body.articleid;
    var content = req.body.comment;
    var time = req.body.time;
    db(function(con){
        var sql = 'select * from articlelist where id='+articleid+';';
        con.query(sql,function(err,rows){
           if(err){
               console.log(err);
               return;
           }
           var userid = rows[0].userid;
            db(function (con) {
                var sql = 'insert into commentlist(repliederid,commenterid,commentername,articleid,comment_content,comment_time,belongs) values'
                    +'(\''+userid+'\',\''+commenterid+'\',\''+commentername+'\',\''+articleid+'\',\''+content+'\',\''+time+'\',\'article\');';
                con.query(sql,function (err,rows) {
                    if(err){
                        console.log(err);
                        return;
                    }
                    res.send("success");
                })
            },'blog');
        });
    },'blog');

}
function getComment(req,res){
    var articleid = req.body.articleid;
    db(function(con){
        var sql = 'select * from commentlist where articleid='+articleid+';';
        con.query(sql,function(err,rows){
            if(err){
                console.log(err);
                return;
            }
            res.send(rows);
        })
    },'blog');
}
module.exports = comment;