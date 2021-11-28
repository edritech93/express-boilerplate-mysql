'use strict'
module.exports = function (router) {
    const controller = require('../controllers/tokens');
    router.post('/v1/register', controller.register);
    router.post('/v1/login', router.oauth.token());
}
