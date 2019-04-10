var express = require('express');
var app = express();
app.set('port', process.env.PORT || 3000);

 var forceSsl = function (req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
        return res.redirect(['https://', req.get('Host'), req.url].join(''));
    }
    return next();
 };



app.configure(function(){
	app.use(express.methodOverride());
	app.use(express.bodyParser());
	app.use(app.router);
	app.use(forceSsl);
	app.set('view engine', 'jade');
	app.set('views', __dirname + '/public');
	app.set('view options', {layout: false});
	app.set('basepath',__dirname + '/public');
});





app.configure('production', function(){
	var oneYear = 31557600000;
	app.use(express.static(__dirname + '/public', { maxAge: oneYear }));
	app.use(express.errorHandler());
});

console.log("Web server has started.\nPlease log on http://127.0.0.1:3002/index.html");
app.listen(app.get('port'));
