'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Media = mongoose.model('Media'),
    _ = require('lodash');


/**
 * Find media by id
 */
exports.media = function (req, res, next, id) {
    Media.load(id, function (err, media) {
        if (err) {
            return next(err);
        }
        if (!media) {
            return next();
        }
        req.media = media;
        next();
    });
};

/**
 * Create a media
 */
exports.create = function (req, res) {
    var student = req.query.user;
    var nid = req.query.nid;
    var unique = student + nid;
    var query = {identifier: unique};
    var timestamp = req.query.timestamp;
    var options = {
        new: true,
        upsert: true
    };

    Media.findOneAndUpdate(query, {timestamp: timestamp, nid: nid, student: student}, options, function (err, data) {
        if (err) {
            return err;
        } else {
            res.send('1');
            return true;
        }
    });
};

/**
 * Update a media
 */
exports.update = function(req, res) {
    var media = req.media;

    media = _.extend(media, req.body);

    media.save(function(err) {
        if (err) {
            return new Error(err);
        } else {
            res.jsonp(media);
        }
    });
};

/**
 * Delete a media
 */
exports.destroy = function(req, res) {
    var media = req.media;

    media.remove(function(err) {
        if (err) {
            return new Error(err);
        } else {
            res.jsonp(media);
        }
    });
};

/**
 * Show a media
 */
exports.show = function(req, res) {
    res.jsonp(req.media);
};

/**
 * List of medias
 */
exports.all = function(req, res) {
    Media.find().sort('-created').populate('user', 'name username').exec(function(err, medias) {
        if (err) {
            return new Error(err);
        } else {
            res.jsonp(medias);
        }
    });
};
