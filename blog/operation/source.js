const db = require('../db/db');
var formidable = require('formidable');
var path = require("path");
var fs = require("fs");

function source(req, res) {
    var form = new formidable.IncomingForm(); //创建上传表单  
    form.encoding = 'utf-8'; //设置编辑  
    form.uploadDir = './file'; //设置上传目录  
    form.keepExtensions = false; //保留后缀 
    form.parse(req, function (err, fields, files) {
        if (err) {
            res.send(err);
            return;
        }
        if (fields.action == 'upload') {
            upload(req, res, fields, files);
        }
    });
}
function upload(req, res, fields, files) {
    var uploadtime = fields.uploadtime;
    var y = uploadtime.split("/")[0];
    var m = uploadtime.split("/")[1];
    var d = uploadtime.split("/")[2].split(" ")[0];
    var t = uploadtime.split(" ")[1];
    var userid = fields.userid;
    fs.renameSync(files.file.path, "./file/" + y + "_" + m + "_" + d + "_" + t + "_" + userid + "-" + files.file.name);
    var filepath = "./file/" + y + "_" + m + "_" + d + "_" + t + "_" + userid + "-" + files.file.name;
    var filename = files.file.name;
    var username = fields.username;
    var uploadtime = fields.uploadtime;
    var keyword = fields.keyword;
    var description = fields.description;
    var filetype = fields.filetype;
    var classify = fields.classify;
    var point = fields.point;
    db(function (con) {
        var sql = 'insert into sourcelist(userid,username,sourcename,sourcetype,keywords,category,sourcepoint,description,uploadtime,sourcepath,status)'
            + ' values("' + userid + '","' + username + '","' + filename + '","' + filetype + '","' + keyword + '","' + classify + '","' + point + '","' + description + '","' + uploadtime + '","' + filepath + '","0");';
        con.query(sql, function (err, rows) {
            if (err) {
                console.log(err);
                return;
            }
            res.send("success");
        });
    }, 'blog');
}
module.exports = source;