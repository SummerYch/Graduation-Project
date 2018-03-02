const db = require('../db/db');
function getsource(req,res){
    console.log("in getsource");
    if(req.body.action == 'posted'){
        getPosted(req,res);
    }
    if(req.body.action == 'admingetsource'){
        adminGetSource(req,res);
    }
    if(req.body.action == 'sourcepass'){
        sourcePass(req,res);
    }
    if(req.body.action == 'sourcenotpass'){
        sourceNotPass(req,res);
    }
}

function getPosted(req,res){
    var userid = req.body.userid;
    db(function(con){
        var sql = 'select * from sourcelist where userid='+userid+' and status=1;';
        con.query(sql,function(err,rows){
            if(err){
                console.log(err);
                return;
            }
            res.send(rows);
        })
    },'blog');
}
function adminGetSource(req,res){
    db(function(con){
        var sql = 'select * from sourcelist where status=0;';
        con.query(sql,function(err,rows){
            if(err){
                console.log(err);
                return;
            }
            res.send(rows);
        })
    },'blog');
}
function sourcePass(req,res){
    var sourceid = req.body.sourceid;
    db(function(con){
        var sql = 'update sourcelist set status=1 where id='+sourceid;
        con.query(sql,function(err,rows){
            if(err){
                console.log(err);
                return;
            }
            res.send("success");
        });
    },'blog');
}
function sourceNotPass(req,res){
    var sourceid = req.body.sourceid;
    db(function(con){
        var sql = 'update sourcelist set status=-1 where id='+sourceid;
        con.query(sql,function(err,rows){
            if(err){
                console.log(err);
                return;
            }
            res.send("success");
        })
    },'blog');
}
module.exports = getsource;