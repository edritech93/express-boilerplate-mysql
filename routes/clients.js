'use strict'
module.exports = function (router) {
    const controller = require('../controllers/clients');
    router.get('/v1/clients', controller.getClients);
    router.post('/v1/clients', controller.addClients);
}
