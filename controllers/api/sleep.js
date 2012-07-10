function registerRoutes(app){
    app.get("/api/sleep", function (req, res) {
        console.log("sleep");

        res.send({
            success: true,
            message: "sleep"
        });
    });

    app.get("/api/sleep/random", function (req, res) {
        random(req, res, "sleep/random");
    });

    app.get("/api/sleep/routeone", function (req, res) {
        random(req, res, "sleep/routeone");
    });

    app.get("/api/sleep/routetwo", function (req, res) {
        random(req, res, "sleep/routetwo");
    });

    app.get("/api/sleep/routethree", function (req, res) {
        random(req, res, "sleep/routethree");
    });

    app.get("/api/sleep/routefour", function (req, res) {
        random(req, res, "sleep/routefour");
    });

    app.get("/api/sleep/routefive", function (req, res) {
        random(req, res, "sleep/routefive");
    });

    app.get("/api/sleep/routesix", function (req, res) {
        random(req, res, "sleep/routesix");
    });

    app.get("/api/sleep/routeseven", function (req, res) {
        random(req, res, "sleep/routeseven");
    });

    app.get("/api/sleep/routeeight", function (req, res) {
        random(req, res, "sleep/routeeight");
    });

    app.get("/api/sleep/routenine", function (req, res) {
        random(req, res, "sleep/routenine");
    });

    app.get("/api/sleep/routeten", function (req, res) {
        random(req, res, "sleep/routeten");
    });

    app.get("/api/sleep/twofifty", function (req, res) {
        sleep(req, res, "sleep/twofifty", 250);
    });
}

module.exports = {
    registerRoutes: registerRoutes
};

function random(req, res, route) {
    var time = Math.floor(Math.random()*11); // 0 - 10
	sleep(req, res, route, time);
}

function sleep(req, res, route, time) {
	console.log(route);
        
    setTimeout(function(){
		console.log(route + " done");

        res.send({
            success: true,
            message: route,
            time: time
        });

    }, time);
}
