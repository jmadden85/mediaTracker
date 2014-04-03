'use strict';

// User routes use users controller
var media = require('../controllers/media');

module.exports = function (app) {

    app.post('/media', media.create);
//    app.get('media', media.reportMedia);

};
