const db = require('../db/db');
function comment(req,res) {
    if(req.body.action == 'articlecomment'){
        articleComment(req,res);
    }
    if(req.body.action == 'getcomment'){
        getComment(req,res);
    }
    if(req.body.action == 'sourcecomment'){
        sourceComment(req,res);
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
                var sql = 'insert into commentlist(repliederid,commenterid,commentername,articleorsourceid,comment_content,comment_time,belongs) values'
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
    if(req.body.belongd == 'article'){
        db(function(con){
            var sql = 'select * from commentlist where articleorsourceid='+articleid+' and belongs=\'article\';';
            con.query(sql,function(err,rows){
                if(err){
                    console.log(err);
                    return;
                }
                res.send(rows);
            })
        },'blog');
    }else{
        db(function(con){
            var sql = 'select * from commentlist where articleorsourceid='+articleid+' and belongs=\'source\';';
            con.query(sql,function(err,rows){
                if(err){
                    console.log(err);
                    return;
                }
                res.send(rows);
            })
        },'blog');
    }

}
function sourceComment(req,res){
    console.log("in sourceComment");
    var commenterid = req.body.userid;
    var commentername = req.body.username;
    var sourceid = req.body.sourceid;
    var content = req.body.comment;
    var time = req.body.time;
    db(function (con) {
        var sql = 'insert into commentlist(commenterid,commentername,articleorsourceid,comment_content,comment_time,belongs) values'
            +'(\''+commenterid+'\',\''+commentername+'\',\''+sourceid+'\',\''+content+'\',\''+time+'\',\'source\');';
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