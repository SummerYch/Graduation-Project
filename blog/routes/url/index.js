var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.render('index', {
        title: 'index'
    });
})
router.get('/register', function (req, res) {
    res.render('register', {
        title: 'register'
    });
})
router.get('/login', function (req, res) {
    res.render('login', {
        title: 'login'
    });
})
module.exports = router;