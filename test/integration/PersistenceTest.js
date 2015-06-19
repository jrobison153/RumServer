"use strict";

var persistence = require("../../src/io/Persistence");
var expect = require("chai").expect;

var MEASURE_NAME = 'measure-thread-click';

var getQuery = {
    name: MEASURE_NAME
};

var deleteMeasureDataQuery = {
    name: MEASURE_NAME
};

describe("Peristence Tests", function () {

    describe("Given database server is running", function () {
        var measureData = {};

        beforeEach(function () {
            var deleteTestDataQuery = {
                testData: "true"
            };

            measureData = buildMeasureData();

            return persistence.connect().then(function () {
                return persistence.del(deleteTestDataQuery);
            });

        });

        afterEach(function () {
            persistence.disconnect();
        });

        describe("When saving data to the database", function () {

            it("Then one entry is written", function () {

                return persistence.save(measureData).then(function (result) {
                    expect(result.insertedCount).to.equal(1);
                });

            });

            it("Then saved entry can be retrieved", function () {

                return validateSaveGetData(measureData);

            });

            it("Then the saved entry can be removed", function () {

                return validateSaveGetData(measureData).then(function () {

                    return persistence.del(deleteMeasureDataQuery);

                }).then(function () {

                    return persistence.get(getQuery);

                }).then(function (result) {

                    expect(result).to.have.length(0);
                });

            });

            it("Then on data retrieval the _id field is not present", function () {

                return validateSaveGetData(measureData).then(function (result) {

                    for (var i = 0; i < result.length; i++) {

                        expect(result[i]._id).to.equal(undefined);
                    }
                });
            });
        });

        describe("When attempting to delete non-existent data", function () {
            it("Then there should be no errors", function () {

                return persistence.del({
                    testData: "true"
                }).then(function () {

                    expect(true).to.equal(true);

                }, function () {

                    expect(true).to.equal(false);

                });

            });
        });

        describe("When attempting to get non-existent data", function () {
            it("Then there should be zero results", function () {

                persistence.get({
                    testData: "true"
                }).then(function (result) {

                    expect(result).to.have.length(0);

                }, function () {

                    expect(true).to.equal(false);

                });
            });
        });
    });
});

// ============================ Test Composition Functions =====================================
function validateSaveGetData(measureData) {

    return persistence.save(measureData).then(function () {

        if (measureData.hasOwnProperty("_id")) {
            delete measureData._id;
        }

        return persistence.get(getQuery);

    }).then(function (result) {

        expect(result[0]).to.deep.equal(measureData);
        return result;

    });

}

// ============================== Utilty Functions ==========================================

/**
 * build this dynamically for each test, persistence code modifies object by inserting _id attribute, etc...
 */
function buildMeasureData() {
    var measureData = {
        duration: 8.684000000357628, entryType: "measure", name: MEASURE_NAME, startTime: 1321.22199999867
    };

    return measureData;
}
