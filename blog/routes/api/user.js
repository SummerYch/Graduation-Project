var express = require('express');
var router = express.Router();
var User = require('../../operation/user');
router.post('/register', function (req, res) {
    User(req, res);
});//注册
router.post('/login', function (req, res) {
    User(req, res);
});//登录
router.post('/user_info', function (req, res) {
    User(req, res);
});//录入用户信息
router.post('/getUserInfo', function (req, res) {
    User(req, res);
})
module.exports = router;
