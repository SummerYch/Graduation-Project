var express = require('express');
var router = express.Router();
var User = require('../../operation/user');
router.post('/register',function(req,res){
    User(req,res);
});

module.exports = router;
