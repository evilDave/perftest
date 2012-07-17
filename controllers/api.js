var testapi = require("./api/test")
var sleepapi = require("./api/sleep")

function registerRoutes(app){
    testapi.registerRoutes(app);
    sleepapi.registerRoutes(app);
}

module.exports = {
    registerRoutes: registerRoutes
};
