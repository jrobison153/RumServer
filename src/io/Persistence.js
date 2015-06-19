"use strict";

var MongoClient = require('mongodb').MongoClient;
var Q = require('q');

var COLLECTION = "PerformanceMetrics";
var url = 'mongodb://localhost:27017/PerformanceMetrics';

var dbConnection = null;

function connect () {
    var connectedDfd = Q.defer();

    MongoClient.connect(url, function (err, db) {
        if (null === err) {
            dbConnection = db;
            connectedDfd.resolve();
        } else {
            console.log(err);
            connectedDfd.reject(err);
        }
    });

    return connectedDfd.promise;
}

/**
 * 
 * @param query
 *            [JSON] MongoDB Style JSON query
 * @returns Array of all matching entries
 */
function get (query) {

    var getDoneDfd = Q.defer();

    dbConnection.collection(COLLECTION).find(query, {
        _id : 0
    }).toArray(function (err, docs) {
        if (err === null) {

            getDoneDfd.resolve(docs);

        } else {

            console.log("Error reading from database: ", err);
            getDoneDfd.reject(err);
        }
    });

    return getDoneDfd.promise;
}

function save (data) {

    var insertDoneDfd = Q.defer();

    dbConnection.collection(COLLECTION).insertOne(data, function (err, result) {
        if (err === null) {

            insertDoneDfd.resolve(result);

        } else {

            console.log("Save Error: " + err);
            insertDoneDfd.reject(err);
        }
    });

    return insertDoneDfd.promise;
}

function del (query) {

    var deleteDoneDfd = Q.defer();

    dbConnection.collection(COLLECTION).deleteMany(query, function (err, result) {
        if (err === null) {
            deleteDoneDfd.resolve(result);
        } else {
            deleteDoneDfd.reject(err);
        }
    });

    return deleteDoneDfd.promise;
}

function disconnect () {
    dbConnection.close();
}

module.exports = {
    connect : connect,
    get : get,
    del : del,
    disconnect : disconnect,
    save : save
};
