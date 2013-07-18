
/**
 * Module dependencies.
 */

var express = require('express'),
	routes = require('./routes'),
	http = require('http'),
	path = require('path'),
	fs = require('fs'),

	config = require('./config');

var app = express();

app.configure('development', function() {
	console.log('DEVELOPMENT');
	app.use(express.errorHandler());
	app.use(express.logger('dev'));
});

app.configure(function(){

	// app config settings
	app.set('config', config);
	app.set('port', process.env.PORT || 3000);

	// views and directories
	app.set('views', __dirname + '/views');
	app.set('work', __dirname + '/work');

	// Templating engine
	app.engine('html', require('ejs').renderFile);

	app.use(express.favicon());
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));
});

app.get('/', routes.index);

http.createServer(app).listen(app.get('port'), function() {
	console.log("Express server listening on port " + app.get('port'));
});
