# parse-server-bluemix

Originally cloned from [parse-server-example](https://github.com/ParsePlatform/parse-server-example).

Example project using the [parse-server](https://github.com/ParsePlatform/parse-server) module on Express.

Read the full Parse Server guide here: https://github.com/ParsePlatform/parse-server/wiki/Parse-Server-Guide

### For Local Development

* Make sure you have at least Node 4.3. `node --version`
* Clone this repo and change directory to it.
* `npm install`
* Install mongo locally using http://docs.mongodb.org/master/tutorial/install-mongodb-on-os-x/
* Run `mongo` to connect to your database, just to make sure it's working. Once you see a mongo prompt, exit with Control-D
* Run the server with: `npm start`
* By default it will use a path of /parse for the API routes.  To change this, or use older client SDKs, run `export PARSE_MOUNT=/1` before launching the server.
* You now have a database named "dev" that contains your Parse data
* Install ngrok and you can test with devices

### Getting Started With Bluemix + Mongolab Development

#### With the Bluemix Button

[![Deploy](https://www.bluemix.net/deploy/button.png)](https://bluemix.net/deploy)

#### Without It

* Clone the repo and change directory to it
* Deploy the app to Bluemix: `cf push`
* Go to the application's Environment Variables on Bluemix Console and update the following USER-DEFINED variables accordingly:
 * APP_ID
 * MASTER_KEY
 * CLOUD_CODE_MAIN
 * DATABASE_URI
 * PARSE_MOUNT
 * SERVER_URL

#### Create & Configure MongoDB
* Go to [mlab](https://mlab.com) and create a MongoDB database called parse_server_db (for example).
* Update the USER-DEFINED variables for DATABASE_URI such as:
 * `mongodb://<dbuser>:<dbpassword>@abc123.mlab.com:19698/parse_server_db`

# Using it

You can use the REST API, the JavaScript SDK, and any of our open-source SDKs:

Example request to a server running locally:

```
curl -X POST \
  -H "X-Parse-Application-Id: myAppId" \
  -H "Content-Type: application/json" \
  -d '{"score":1337,"playerName":"Sean Plott","cheatMode":false}' \
  http://localhost:1337/parse/classes/GameScore
  
curl -X POST \
  -H "X-Parse-Application-Id: myAppId" \
  -H "Content-Type: application/json" \
  -d '{}' \
  http://localhost:1337/parse/functions/hello
```

Example using it via JavaScript:

```
Parse.initialize('myAppId','unused');
Parse.serverURL = 'https://whatever.mybluemix.net';
var obj = new Parse.Object('GameScore');
obj.set('score',1337);
obj.save().then(function(obj) {
  console.log(obj.toJSON());
  var query = new Parse.Query('GameScore');
  query.get(obj.id).then(function(objAgain) {
    console.log(objAgain.toJSON());
  }, function(err) {console.log(err); });
}, function(err) { console.log(err); });
```

Example using it on Android:
```
//in your application class

Parse.initialize(new Parse.Configuration.Builder(getApplicationContext())
        .applicationId("myAppId")
        .clientKey("myClientKey")
        .server("http://myServerUrl/parse/")   // '/' important after 'parse'
        .build());
        
  ParseObject testObject = new ParseObject("TestObject");
  testObject.put("foo", "bar");
  testObject.saveInBackground();

```
