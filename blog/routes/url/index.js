var express = require('express');
var router = express.Router();
var path = require("path");
var fs = require("fs");

router.get('/', function (req, res) {
    res.render('index', {
        title: 'index'
    });
})
router.get('/register', function (req, res) {
    res.render('register', {
        title: 'register'
    });
})
router.get('/login', function (req, res) {
    res.render('login', {
        title: 'login'
    });
})
router.get('/personalCenter', function (req, res) {
    res.render('personal_center', {
        title: 'personal_center'
    });
})
router.get('/articleManagement', function (req, res) {
    res.render('aiticle_management', {
        title: 'aiticle_management'
    });
})
router.get('/articleDetail', function (req, res) {
    res.render('articledetail', {
        title: 'articledetail'
    });
})
router.get('/uploadsource', function (req, res) {
    res.render('uploadsource', {
        title: 'uploadsource'
    });
})
router.get('/verify',function(req,res){
    res.render('verify',{
        title:'uploadsource'
    });
})
router.get('/articlepage',function(req,res){
    res.render('articlepage');
})
router.get('/sourceBaseCamp',function (req,res) {
    res.render('sourceBaseCamp');
})
router.get('/downloadsource',function(req,res){
    res.render('downloadsource');
})
router.get('/download', function (req, res, next) {
    var filepath = req.query.sourcepath;
    var filename = filepath.split("-")[1];
    fs.stat(filepath, function (err, stats) {
        if (err) {
            console.log(err);
            return;
        }
        console.log(stats.isFile());
        if (stats.isFile()) {
            res.writeHead(200, {
                'Content-Type': 'application/force-download',
                'Content-Disposition': 'attachment; filename=' + encodeURI(filename),
            });
            fs.createReadStream(filepath).pipe(res);
        } else {
            res.end(404);
        }
    })
});
module.exports = router;