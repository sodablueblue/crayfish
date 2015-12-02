var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

module.exports = function(db){
	/*Init app and http server*/
	var app = express();
	var server = http.createServer(app);

	/*Set Env*/
	// if(process.env.NODE_ENV === 'development'){

	// }else{

	// }

	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());
	app.use(methodOverride());

	/* Set Database */
	var mongoStore = new MongoStore({db: db.connection.db});

	/* Set static folder */
	app.set('views', './views');
	app.engine('.html', require('ejs').renderFile);
	app.use(express.static('./public'));
    
	/*Set Routers*/
	require('../app/index/router')(app);
	require('../app/blogList/router')(app);
	require('../app/blog/router')(app);

	return server;
}