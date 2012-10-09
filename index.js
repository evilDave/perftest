require('graphdat').config({debug:true});

var express = require("express"),
	app = express(),
	api = require("./controllers/api");

var port = 8123;

api.registerRoutes(app);

// start the http server
app.listen(port, function() {
    console.log("Listening on %d", port);
});
