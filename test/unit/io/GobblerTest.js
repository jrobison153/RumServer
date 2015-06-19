"use strict";

var expect = require("chai").expect;
var Gobbler = require("../../../src/io/Gobbler");
var stream = require("stream");
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

describe("Gobbler", function () {

    var gobbler = null;
    beforeEach(function () {
        gobbler = new Gobbler();
    });

    describe("Given a node stream", function () {

        describe("When reading all data from the stream", function () {

            it("Then the stream data is returned", function () {

                var streamData = "Hi, i'm some stream data";

                var strStream = new stream.Readable();
                var doneDfd = gobbler.getAllStreamData(strStream);

                strStream.push(streamData);
                strStream.push(null);

                return expect(doneDfd).to.eventually.equal(streamData);
            });
        });

        describe("When reading data and an error occurs", function () {

            it("Then the deferred is rejected", function () {

                var strStream = new stream.Readable();
                var doneDfd = gobbler.getAllStreamData(strStream);

                strStream.emit("error");

                return expect(doneDfd).to.eventually.be.rejected;

            });
        });

        describe("When reading a stream with no data", function () {

            it("Returns the empty string", function () {

                var strStream = new stream.Readable();
                var doneDfd = gobbler.getAllStreamData(strStream);

                strStream.push(null);

                return expect(doneDfd).to.eventually.equal("");
            });
        });
    });
});