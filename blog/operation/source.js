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
    fs.renameSync(files.file.path, "./file/" + files.file.name);
    var filepath = './file/'+files.file.name;
    var userid = fields.userid;
    var username = fields.username;
    var uploadtime = fields.uploadtime;
    var keyword = fields.keyword;
    var description = fields.description;
    var filetype = fields.filetype;
    var classify = fields.classify;
    var point = fields.point;
    res.send("success");
}
module.exports = source;