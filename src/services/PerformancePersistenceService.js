/**
 * Service operations to persist quote data
 */

"use strict";


/**
 * @param {Persistence}
 *            Interface used to persist data to permenant store
 */
module.exports = function SaveQuoteServices(persistence) {
    var wrapper = {
        /**
         * Persist data to permenant store
         *
         * @param {json}
         *            Data to persist
         */
        save: function (measurementData) {
            return persistence.save(measurementData);
        },

        get: function () {
            // TODO
        }
    };

    return wrapper;
};