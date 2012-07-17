require('nodetime').profile({
    /*netSync: false,*/
    gdSync: {
        /*logger: logger,*/
        /*debug: {
            sync_write:false,
            http_begin:false,
            http_end:false
        }*/
    }
});

var express = require("express"),
    app = express.createServer()
    api = require("./controllers/api");

var port = 8001;

/* Sample logger
function logger() {
    var args = Array.prototype.slice.apply(arguments, [ 1 ]);
    console.log('Graphdat Logged:')
    console.log.apply(this, args);
    console.log('--------')
}
*/

api.registerRoutes(app);

// start the http server
app.listen(port, function() {
    console.log("Listening on %d", port);
});
