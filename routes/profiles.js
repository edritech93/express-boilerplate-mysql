'use strict'
module.exports = function (router) {
    const controller = require('../controllers/profiles');
    router.get('/v1/profiles', router.oauth.authenticate(), controller.getProfiles);
}
