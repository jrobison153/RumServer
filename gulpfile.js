var gulp = require('gulp');
var Server = require('./src/server/Server');
var mocha = require('gulp-mocha');
var jshint = require("gulp-jshint");
var jshintStylish = require("jshint-stylish");
var runSequence = require("run-sequence");

gulp.task("startServer", function () {

    return Server.start();
});

gulp.task("unitTest", function () {
    return gulp.src('./test/unit/**/*Test.js', {
        read : false
    }).pipe(mocha({
        reporter : 'nyan'
    }))
});

gulp.task("functionalTest", function () {
    return gulp.src('./test/functional/**/*Test.js', {
        read : false
    }).pipe(mocha({
        reporter : 'nyan'
    }))
});

gulp.task("integrationTest", function () {
    return gulp.src('./test/integration/**/*Test.js', {
        read : false
    }).pipe(mocha({
        reporter : 'nyan'
    }))
});

gulp.task("preCommit", function () {

    runSequence("lint", "unitTest", "integrationTest", "functionalTest");
});

gulp.task("lint", function () {
    var jshintStream = gulp.src([
        "./src/**/*.js", "./test/**/*.js"
    ]).pipe(jshint(".jshintrc")).pipe(jshint.reporter(jshintStylish)).pipe(jshint.reporter('fail'));

    jshintStream.on("error", function () {
        // handle the error so that watch task doesn't terminate when the exception blows back up the call stack
    });

    return jshintStream;
});

gulp.task("watch", [
    "preCommit"
], function () {

    gulp.watch([
        "./src/**/*.js", "./test/**/*.js"
    ], [
        "preCommit"
    ]);
});
