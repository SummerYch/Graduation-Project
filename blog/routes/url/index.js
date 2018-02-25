var express = require('express');
var router = express.Router();

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
router.get('/uploadsource',function(req,res){
    res.render('uploadsource',{
        title:'uploadsource'
    });
})
module.exports = router;