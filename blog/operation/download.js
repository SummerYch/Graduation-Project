var request = require("request");
var path = require("path");
var fs = require("fs");
function download(req,res) {
    console.log("!!!!!!!!!!!!1");
    console.log(req.body);
    var filename = req.body.sourcename;
    var filepath = path.join(__dirname,filename);
    var stats = fs.statSync(filepath);
    if(stats.isFile()){
        res.set({
            'Content-Type':'application/octet-stream',
            'Content-Disposition':'attachment; filename='+filename,
            'Content-Length':stats.size
        });
        fs.createReadStream(filepath).pipe(res);
    }else{
        res.end(404);
    }

}
module.exports = download;