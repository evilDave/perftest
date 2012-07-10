var testapi = require("./api/test")
var testapi = require("./api/sleep")

function registerRoutes(app){
    testapi.registerRoutes(app);
}

module.exports = {
    registerRoutes: registerRoutes
};
