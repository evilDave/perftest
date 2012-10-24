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

	    req.graphdat.begin("one");

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

	var doSomethingAsync = function(cb) {
		cb.graphdat.begin("async1");
		setTimeout(function() {

			cb.graphdat.begin("async2");
			setTimeout(function() {

				cb();
			}, 500);
		}, 500);
	}

	app.get("/api/test/recursive", function (req, res) {
		console.log("/api/test/recursive");

		req.graphdat.begin("outer");

		var c = 0;

		recurse();

		function recurse()
		{
			req.graphdat.begin('recurse');
			if (++c >= 10)
			{
				res.send({
					         success: true,
					         message: "test/async"
				         });
				return;
			}

			recurse();
		}
	});


	app.get("/api/test/deeplyrecursive", function (req, res) {
		console.log("/api/test/deeplyrecursive");

		req.graphdat.begin("outer");

		var c = 0;

		A();

		function A()
		{
			req.graphdat.begin('A');

			B();
		}

		function B()
		{
			req.graphdat.begin('B');

			C();
		}

		function C()
		{
			req.graphdat.begin('C');

			if (++c >= 3)
			{
				res.send({
					         success: true,
					         message: "test/deeplyrecursive"
				         });
				return;
			}

			A();
		}
	});

	app.get("/api/test/params/:id", function (req, res) {
		console.log("/api/test/params");

		req.graphdat.begin("one");

		res.send({
			         success: true,
			         message: "test/params"
		         });
	});
}

module.exports = {
    registerRoutes: registerRoutes
};
