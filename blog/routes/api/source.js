var express = require('express');
var router = express.Router();
var source = require('../../operation/source');
var getsource = require('../../operation/getsource');
router.post('/upload',function(req,res){
    source(req,res);
});
router.post('/getsource',function(req,res){
    getsource(req,res);
});
module.exports = router;