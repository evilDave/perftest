var testapi = require("./api/test")

function registerRoutes(app){
    testapi.registerRoutes(app);
}

module.exports = {
    registerRoutes: registerRoutes
};
