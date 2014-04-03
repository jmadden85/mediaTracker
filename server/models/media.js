'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * User Schema
 */
var MediaSchema = new Schema({
    identifier: {
        type: String,
        required: true
    },
    student: {
        type: String,
        required: true
    },
    nid: {
        type: String,
        required: true
    },
    timestamp: {
        type: Number,
        required: true
    }
});

/**
 * Validations
 */
var validatePresenceOf = function (value) {
    return value && value.length;
};

MediaSchema.path('nid').validate(function (id) {
    // If you are authenticating by any of the oauth strategies, don't validate.
    if (!this.provider) {
        return true;
    }
    return (typeof nid === 'string' && nid.length > 0);
}, 'NID cannot be blank');


/**
 * Methods
 */
MediaSchema.methods = {

};

mongoose.model('Media', MediaSchema);