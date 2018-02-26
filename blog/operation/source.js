const db = require('../db/db');

function source(req,res){
    console.log(req.body);
}

module.exports = source;