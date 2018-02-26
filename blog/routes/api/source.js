var express = require('express');
var router = express.Router();
var source = require('../../operation/source');

router.post('/upload',function(req,res){
    console.log("1");
    source(req,res);
});

module.exports = router;