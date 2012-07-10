require('nodetime').profile({netSync:false, gdSync:{}});

var express = require("express"),
    app = express.createServer()
    api = require("./controllers/api");

var port = 8001;

api.registerRoutes(app);

// start the http server
app.listen(port, function() {
    console.log("Listening on %d", port);
});
