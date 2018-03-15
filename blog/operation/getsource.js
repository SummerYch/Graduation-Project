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
    if(req.body.action == 'getsourcelist'){
        getSourceList(req,res);
    }
    if(req.body.action == 'sourcegetuser'){
        sourceGetUser(req,res);
    }
    if(req.body.action == 'addcollect'){
        addCollect(req,res);
    }
    if(req.body.action == 'cancelcollect'){
        cancelCollect(req,res);
    }
    if(req.body.action == 'ifcollected'){
        ifCollected(req,res);
    }
    if(req.body.action == 'geticollect'){
        getCollect(req,res);
    }
    if(req.body.action == 'gethimsource'){
        getHimSource(req,res);
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
function getSourceList(req,res){
    console.log("in getSourceList");
    db(function(con){
        var sql = 'select * from sourcelist where status=1;';
        con.query(sql,function(err,rows){
           if(err){
               console.log(err);
               return;
           }
           res.send(rows);
        });
    },'blog');
}
function sourceGetUser(req,res){
    var sourceid = req.body.sourceid;
    db(function(con){
        var sql = 'select * from sourcelist where id='+sourceid+';';
        con.query(sql,function(err,rows){
            if(err){
                console.log(err);
                return;
            }
            res.send(rows);
        });
    },'blog');
}
function addCollect(req,res){
    var userid = req.body.userid;
    var sourceid = req.body.sourceid;
    db(function(con){
        var sql = 'insert into sourcecollection(collecterid,sourceid) values(\''+userid+'\',\''+sourceid+'\');';
        con.query(sql,function (err,rows) {
            if(err){
                console.log(err);
                return;
            }
            res.send("success");
        })
    },'blog');
}
function cancelCollect(req,res){
    var userid = req.body.userid;
    var sourceid = req.body.sourceid;
    db(function(con){
        var sql = 'delete from sourcecollection where collecterid='+userid+' and sourceid='+sourceid+';';
        con.query(sql,function (err,rows) {
            if(err){
                console.log(err);
                return;
            }
            res.send("success");
        })
    },'blog');
}
function ifCollected(req,res){
    var collecterid = req.body.collecterid;
    var sourceid = req.body.sourceid;
    db(function(con){
        var sql = 'select * from sourcecollection where collecterid='+collecterid+' and sourceid='+sourceid+';';
        con.query(sql,function(err,rows){
           if(err){
               console.log(err);
               return;
           }
           res.send(rows);
        });
    },'blog');
}
function getCollect(req,res) {
    console.log("now in getcollect")
    var userid = req.body.userid;
    db(function (con) {
        var sql = 'select * from sourcecollection where collecterid='+userid+';';
        con.query(sql,function (err,rows) {
            if(err){
                console.log(err);
                return;
            }
            var source = [];
            var l = rows.length;
            for(var i = 0;i<l;i++){
                byIdGetSource(function (rows,l,res) {
                    source.push(rows[0]);
                    if(source.length === l){
                        res.send(source);
                    }
                },rows[i].sourceid,l,res);
            }
            // res.send(rows);
        })
    },'blog');
}
function byIdGetSource(cb,id,l,res) {
    db(function (con) {
        var sql = 'select * from sourcelist where id='+id+';';
        con.query(sql,function (err,rows) {
            if(err){
                console.log(err);
                return;
            }
            cb(rows,l,res);
        })
    },'blog')
}
function getHimSource(req,res) {
    console.log("--------------now in gethimsource-----------------");
    var himid = req.body.userid;
    db(function (con) {
        var sql = 'select * from sourcelist where userid='+himid+';';
        con.query(sql,function (err,rows) {
           if(err){
               console.log(err);
               return;
           }
           res.send(rows);
        });
    },'blog')
}
module.exports = getsource;