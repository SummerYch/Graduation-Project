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
});
router.post('/addattention',function (req,res) {
    User(req,res);
});//添加关注
router.post('/cancelattention',function(req,res){
    User(req,res);
});//取消关注
router.post('/ifattention',function(req,res){
    User(req,res);
});//判断是否关注
router.post('/getconcern',function (req,res) {
    User(req,res);
});//获取关注的用户
router.post('/gethimname',function (req,res) {
    User(req,res);
});//获取博客所属用户名
router.post('/search',function (req,res) {
    User(req,res);
});//搜索
router.post('/concerni',function (req,res) {
    User(req,res);
});//关注我的
module.exports = router;
