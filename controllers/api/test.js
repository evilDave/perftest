var nodetime = require('nodetime'),
    _ = require("underscore");

function registerRoutes(app){
    app.get("/api/test", function (req, res) {
        req.graphdat.begin("test");

        res.send({
            success: true,
            message: "test"
        });

        console.log("/api/test");
    });

    app.get("/api/test/slow", function (req, res) {
        req.graphdat.begin("slow_part_one");

        setTimeout(function(){
            req.graphdat.end();

            req.graphdat.begin("slow_part_two");

            setTimeout(function(){
                res.send({
                    success: true,
                    message: "test/slow"
                });

                console.log("/api/test/slow");
            }, 1000);

        }, 5000);

    });

    app.get("/api/test/fast", function (req, res) {
        req.graphdat.begin("fast");

        res.send({
            success: true,
            message: "test/fast"
        });

        console.log("/api/test/fast");
    });
}

module.exports = {
    registerRoutes: registerRoutes
};
