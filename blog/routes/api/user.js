var express = require('express');
var router = express.Router();
var User = require('../../operation/user');
router.post('/register',function(req,res){
    User(req,res);
});
router.post('/login',function(req,res){
    User(req,res);
});
router.post('/user_info',function(req,res){
    User(req,res);
})
module.exports = router;