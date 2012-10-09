function registerRoutes(app){
    app.get("/api/test", function (req, res) {
        console.log("/api/test");

        res.send({
            success: true,
            message: "test"
        });
    });

    app.get("/api/test/slow", function (req, res) {
        console.log("/api/test/slow");

        setTimeout(function(){
            console.log("/api/test/slow Done");

            res.send({
                success: true,
                message: "test/slow"
            });

        }, 10000);

    });

    app.get("/api/test/fast", function (req, res) {
        console.log("/api/test/fast");

        res.send({
            success: true,
            message: "test/fast"
        });
    });
}

module.exports = {
    registerRoutes: registerRoutes
};
