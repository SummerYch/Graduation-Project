var express = require('express');
var router = express.Router();
var comment = require('../../operation/comment');

router.post('/article',function(req,res){
    console.log("1");
   comment(req,res);
});
module.exports = router;