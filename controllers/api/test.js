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

	doSomething = function(cb) {
		console.log("do something");
		cb.graphdat.begin("two");
		cb();
	}

	app.get("/api/test/trace", function (req, res) {
		console.log("/api/test/trace");

		req.graphdat.begin("one");

		doSomething(req.graphdat.trace(function() {
			res.send({
				         success: true,
				         message: "test/trace"
			         });
		}));

	});

	app.get("/api/test/forloop", function (req, res) {
		console.log("/api/test/forloop");

		req.graphdat.begin("outer");

		for(var i = 0; i < 10; i++) {
			req.graphdat.begin("inner");
			for(var j = 0; j < 1000; j++) {
				var k = j^j;
			}
			req.graphdat.end("inner");
		}

		res.send({
			         success: true,
			         message: "test/forloop"
		         });
	});


	app.get("/api/test/async", function (req, res) {
		console.log("/api/test/async");

		req.graphdat.begin("outer");

		for(var i = 0; i < 10; i++) {
			doSomethingAsync(req.graphdat.trace(function() {}));
		}

		setTimeout( function() {
			res.send({
				         success: true,
				         message: "test/async"
			         });
		}, 2000);
	});

	doSomethingAsync = function(cb) {
		cb.graphdat.begin("async1");
		setTimeout(function() {

			cb.graphdat.begin("async2");
			setTimeout(function() {

				cb();
			}, 500);
		}, 500);
	}


}

module.exports = {
    registerRoutes: registerRoutes
};
