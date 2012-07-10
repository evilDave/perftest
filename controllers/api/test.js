var nodetime = require('nodetime'),
    _ = require("underscore");

function registerRoutes(app){
    app.get("/api/test", function (req, res) {
        console.log("/api/test");

        debugger;

        var time = nodetime.stats.time();
        if(!time.measure()) return;
        nodetime.stats.value('test', 'Requests per minute', 1, undefined, 'sum');
        nodetime.stats.value('test', 'Average response time', time.ms, 'ms', 'avg');
        nodetime.stats.sample(time, {'Type': 'test', blah: "blah"}, '/api/test');

        time = nodetime.stats.time(true);
        if(!time.measure()) return;
        nodetime.stats.value('test', 'Requests per minute', 1, undefined, 'sum');
        nodetime.stats.value('test', 'Average response time', time.ms, 'ms', 'avg');
        nodetime.stats.sample(time, {'Type': 'test', blah: "blah"}, '/api/test');


        time = nodetime.stats.time();
        if(!time.measure()) return;
        nodetime.stats.value('test', 'Requests per minute', 1, undefined, 'sum');
        nodetime.stats.value('test', 'Average response time', time.ms, 'ms', 'avg');
        nodetime.stats.sample(time, {'Type': 'test', blah: "blah"}, '/api/test');


        res.send({
            success: true,
            message: "test"
        });
    });

    app.get("/api/test/slow", function (req, res) {
        console.log("/api/test/slow");

        var time = nodetime.stats.time(true);

        setTimeout(function(){
            console.log("/api/test/slow Done");

            if(!time.measure()) return;
            nodetime.stats.value('test/slow', 'Requests per minute', 1, undefined, 'sum');
            nodetime.stats.value('test/slow', 'Average response time', time.ms, 'ms', 'avg');
            nodetime.stats.sample(time, {'Type': 'test/slow'}, '/api/test/slow');

            res.send({
                success: true,
                message: "test/slow"
            });

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
