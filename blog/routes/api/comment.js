var express = require('express');
var router = express.Router();
var comment = require('../../operation/comment');

router.post('/article',function(req,res){
   comment(req,res);
});
router.post('/getcomment',function (req,res) {
    comment(req,res);
});
router.post('/source',function (req,res) {
    comment(req,res);
});
module.exports = router;