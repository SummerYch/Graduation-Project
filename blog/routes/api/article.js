var express = require('express');
var router = express.Router();
var article = require('../../operation/article');
router.post('/write', function (req, res) {
    article(req, res);
});
router.post('/get',function(req,res){
    article(req,res);
});
module.exports = router;