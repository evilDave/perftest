var nodetime = require('nodetime'),
    _ = require("underscore");

function registerRoutes(app){
    app.get("/api/test", function (req, res) {
        console.log("/api/test");

        req.graphdat.begin("test");

        res.send({
            success: true,
            message: "test"
        });

        req.graphdat.end("test");
    });

    app.get("/api/test/slow", function (req, res) {
        console.log("/api/test/slow");

        req.graphdat.begin("slow");

        setTimeout(function(){
            console.log("/api/test/slow Done");

            res.send({
                success: true,
                message: "test/slow"
            });

            req.graphdat.end("slow");
        }, 10000);

    });

    app.get("/api/test/fast", function (req, res) {
        console.log("/api/test/fast");

        var time = nodetime.stats.time(true);


        var subtime = nodetime.stats.time();
        if(!subtime.measure()) return;
        nodetime.stats.value('test', 'Requests per minute', 1, undefined, 'sum');
        nodetime.stats.value('test', 'Average response time', time.ms, 'ms', 'avg');
        nodetime.stats.sample(subtime, {'Type': 'test', blah: "blah"}, '/api/test');


        if(!time.measure()) return;
        nodetime.stats.value('test/fast', 'Requests per minute', 1, undefined, 'sum');
        nodetime.stats.value('test/fast', 'Average response time', time.ms, 'ms', 'avg');
        nodetime.stats.sample(time, {'Type': 'test/slow'}, '/api/test/fast');

        res.send({
            success: true,
            message: "test/fast"
        });
    });
}

module.exports = {
    registerRoutes: registerRoutes
};
