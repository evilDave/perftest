var testapi = require("./api/test"),
	sleepapi = require("./api/sleep");

function registerRoutes(app){
    testapi.registerRoutes(app);
    sleepapi.registerRoutes(app);
}

module.exports = {
    registerRoutes: registerRoutes
};
