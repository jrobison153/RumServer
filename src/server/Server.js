"use strict";

// t-edit
var cors = require('cors');

var express = require("express");
var Q = require('q');
var persistence = require("../io/Persistence");
var PerformancePersistenceService = require('../services/PerformancePersistenceService');
var Gobbler = require('../io/Gobbler');
var RESOURCE = require("./ResourceUris").RESOURCE;

var port = 9099;

var serverInstance = null;

function getPort () {
    return port;
}

function start () {
    var server = express();
    server.use(cors());

    var serverStartedDfd = Q.defer();

    server.get(RESOURCE.GET_MEASURE, function (req, res) {
        try {
            var quoteId = req.query.quoteId;

            var getService = new PerformancePersistenceService(persistence);

            getService.get(quoteId).then(function (quoteData) {

                res.status(200).send(quoteData);

            }, function () {

                // TODO implement error handling response
            });

        } catch (e) {

            res.status(500).send("Unknown error processing request");
        }
    });

    server.post(RESOURCE.SAVE_MEASURE, function (req, res) {
        try {
            var gobbler = new Gobbler();
            var dataRetrievedPromise = gobbler.getAllStreamData(req);

            dataRetrievedPromise.then(function (payload) {

                var parsedPayload = null;
                try {

                    parsedPayload = JSON.parse(payload);
                } catch (e) {

                    if (e instanceof SyntaxError) {
                        console.log("Attempt to save non-JSON payload");
                    }
                }

                if (parsedPayload !== null) {
                    var saveService = new PerformancePersistenceService(persistence);
                    return saveService.save(parsedPayload);
                }
            }, function () {

                res.status(500).send("Unable to process request, error reading payload");

            }).then(function () {

                res.status(200).send();

            }, function (err) {

                console.log(err);
                res.status(500).send("Persistence Error");

            });
        } catch (e) {

            res.status(500).send("Unknown error processing request");
        }
    });

    serverInstance = server.listen(port, function () {
        console.log("Listening on port ", port + "...");

        persistence.connect().then(function () {
            serverStartedDfd.resolve();
        }, function (err) {
            stop();
            console.log(err);
        });
    });

    return serverStartedDfd.promise;
}

function stop () {
    serverInstance.close();

    persistence.disconnect();
}

module.exports = {
    start : start,
    stop : stop,
    getPort : getPort
};