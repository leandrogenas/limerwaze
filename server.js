var express = require("express");

var app = express();

app.use(express.static('visual'));
app.use('/js', express.static(__dirname + '/visual/js'));
app.use('/css', express.static(__dirname + '/visual/css'));

var server = app.listen(8081, function(){
    var port = server.address().port;
    console.log("Servidor iniciado em http://localhost:%s", port);
});