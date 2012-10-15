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

	app.get("/api/test/multicall", function (req, res) {
		console.log("/api/test/multicall");

		req.graphdat.begin("zero");
		setTimeout(function(){
			req.graphdat.end("zero");

			req.graphdat.begin("one");
			setTimeout(function(){
				req.graphdat.end("one");

				req.graphdat.begin("one");
				setTimeout(function(){
					req.graphdat.end("one");

					res.send({
						         success: true,
						         message: "test/multicall"
					         });

				}, 100);

			}, 100);

		}, 100);

	});

	app.get("/api/test/replacement", function (req, res) {
		console.log("/api/test/replacement");

		req.graphdat.begin("slash/slash");
		req.graphdat.begin("colon::colon");

		res.send({
			         success: true,
			         message: "test/replacement"
		         });
	});
	
}

module.exports = {
    registerRoutes: registerRoutes
};
