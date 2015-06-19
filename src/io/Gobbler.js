/**
 * Gobbles up stream data for you and makes it accessible
 */

"use strict";

var Q = require("q");

module.exports = function Gobbler () {

    var data = "";

    var wrapper = {
        getAllStreamData : function (stream) {
            data = "";

            var allDataRetrievedDfd = Q.defer();

            stream.on('data', function (chunk) {
                data += chunk;
            });

            stream.on('end', function () {
                allDataRetrievedDfd.resolve(data);
            });

            stream.on('error', function () {
                allDataRetrievedDfd.reject();
            });

            return allDataRetrievedDfd.promise;
        }
    };

    return wrapper;
};
