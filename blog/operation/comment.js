const db = require('../db/db');
function comment(req,res) {
    if(req.body.action == 'articlecomment'){
        articleComment(req,res);
    }
}
function articleComment(req,res){
    var commenterid = req.body.userid;
    var articleid = req.body.articleid;
    var content = req.body.comment;
    var time = req.body.time;
    db(function(con){
        var sql = 'select * from articlelist where articleid='+articleid';'
    },'blog');
    db(function (con) {
        var sql = 'insert into commentlist(commenterid,articleid,comment_content,comment_time,belongs) values'
        +'(\''+commenterid+'\',\''+articleid+'\',\''+content+'\',\''+time+'\',\'article\');';
        con.query(sql,function (err,rows) {
            if(err){
                console.log(err);
                return;
            }
            res.send("success");
        })
    },'blog');
}
module.exports = comment;