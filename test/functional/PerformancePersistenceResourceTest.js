"use strict";

var Server = require("../../src/server/Server");
var RESOURCE = require("../../src/server/ResourceUris").RESOURCE;
var request = require("request");
var Q = require("Q");
var expect = require("chai").expect;
var Gobbler = require("../../src/io/Gobbler");

describe("Save Quote REST Tests", function () {

    var baseUrl = "http://localhost:" + Server.getPort();
    var saveMeasurementUrl = "";

    var measurementData = {
        duration: 8.684000000357628, entryType: "measure", name: "measure-thread-click", startTime: 1321.22199999867
    };

    describe("Given server is up and healthy", function () {
        saveMeasurementUrl = baseUrl + RESOURCE.SAVE_MEASURE;

        var saveMeasure = {
            url: saveMeasurementUrl
        };

        before(function () {
            return Server.start();
        });

        after(function () {
            Server.stop();
        });

        describe("When saving performance measurement data", function () {

            it("Then status code of 200 is returned", function (done) {

                saveMeasure.json = measurementData;

                request.post(saveMeasure).on('response', function (response) {
                    expect(response.statusCode).to.equal(200);
                    done();
                });
            });

            it("Then an empty response payload is returned", function () {
                var dfd = Q.defer();

                saveMeasure.json = measurementData;

                request.post(saveMeasure).on('response', function (response) {
                    var gobbler = new Gobbler();
                    var promise = gobbler.getAllStreamData(response);

                    promise.then(function (payload) {
                        expect(payload).to.equal("");
                        dfd.resolve();
                    }).done();

                });

                return dfd.promise;
            });

        });

        describe("When saving performance measurements with no payload data", function () {

            it("Then status code of 200 is returned", function (done) {

                saveMeasure.json = "";

                request.post(saveMeasure).on('response', function (response) {

                    expect(response.statusCode).to.equal(200);
                    done();

                });
            });
        });
    });
});
