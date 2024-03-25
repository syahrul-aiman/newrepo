//Example express application adding the parse-server module to expose Parse
//compatible API routes.

var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var os = require('os');

var databaseUri = process.env.DATABASE_URI || process.env.MONGOLAB_URI || "";
var cloudPath = process.env.CLOUD_CODE_MAIN || "/cloud/main.js";

if (!databaseUri) {
	console.log('DATABASE_URI not specified, falling back to localhost.');
}

var parseOptions = {
		databaseURI: databaseUri || "",
		cloud: __dirname + cloudPath,
		appId: process.env.APP_ID || 'appId',
		masterKey: process.env.MASTER_KEY || 'masterKey', //Add your master key here. Keep it secret!
		serverURL: process.env.SERVER_URL || os.hostname()  // Don't forget to change to https if needed
};

var api = new ParseServer(parseOptions);
//Client-keys like the javascript key or the .NET key are not necessary with parse-server
//If you wish you require them, you can set them as options in the initialization above:
//javascriptKey, restAPIKey, dotNetKey, clientKey

var app = express();

//Serve the Parse API on the /parse URL prefix
var mountPath = process.env.PARSE_MOUNT || '/parse';
app.use(mountPath, api);

//Parse Server plays nicely with the rest of your web routes
app.get('/', function(req, res) {
	res.status(200).send('I dream of being a web site.');
});

var port = process.env.PORT || 1337;
app.listen(port, function() {
	console.log('parse-server-bluemix running on ' + parseOptions.serverURL + ":" + port + '.');
});
