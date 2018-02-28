var express = require('express');
var router = express.Router();
var article = require('../../operation/article');
//写博客
router.post('/write', function (req, res) {
    article(req, res);
});
//获取文章列表
router.post('/get', function (req, res) {
    article(req, res);
});
//获取对应id的文章内容
router.post('/getdetail', function (req, res) {
    article(req, res);
});
//放入回收站
router.post('/inrecycle', function (req, res) {
    article(req, res);
});
//回收站恢复
router.post('/restore', function (req, res) {
    article(req, res);
});
//回收站彻底删除
router.post('/deepdelete', function (req, res) {
    article(req, res);
});
router.post('/admingetarticle',function(req,res){
    article(req,res);
});
module.exports = router;