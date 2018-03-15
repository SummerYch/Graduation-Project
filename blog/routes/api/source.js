var express = require('express');
var router = express.Router();
var source = require('../../operation/source');
var getsource = require('../../operation/getsource');

router.post('/upload', function (req, res) {
    source(req, res);
});
router.post('/getsource', function (req, res) {
    getsource(req, res);
});
router.post('/admingetsource', function (req, res) {
    getsource(req, res);
});
router.post('/sourcepass', function (req, res) {
    getsource(req, res);
});
router.post('/sourcenotpass', function (req, res) {
    getsource(req, res);
});
router.post('/getsourcelist', function (req, res) {
    getsource(req, res);
});
router.post('/sourcegetuser', function (req, res) {
    getsource(req, res);
});
router.post('/addcollect', function (req, res) {
    getsource(req, res);
});
router.post('/cancelcollect', function (req, res) {
    getsource(req, res);
});
router.post('/ifcollected', function (req, res) {
    getsource(req, res);
});
router.post('/icollect',function (req,res) {
   getsource(req,res);
});
router.post('/gethimsource',function (req,res) {
   getsource(req,res);
});
module.exports = router;