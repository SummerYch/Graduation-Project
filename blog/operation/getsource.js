const db = require('../db/db');
function getsource(req,res){
    console.log("in getsource");
    if(req.body.action == 'posted'){
        console.log("11111");
        getPosted(req,res);
    }
}

function getPosted(req,res){
    var userid = req.body.userid;
    db(function(con){
        var sql = 'select * from sourcelist where userid='+userid;
        con.query(sql,function(err,rows){
            if(err){
                console.log(err);
                return;
            }
            res.send(rows);
        })
    },'blog');
}

module.exports = getsource;