# Real User Monitor Server
An expressJS/MongoDB solution for collecting and persisting web browser performance metrics. This server exposes (or 
 will expose eventually) some very simple REST services for persisting web application performance measurements.
 
An implementation of this solution can be used to implement a Real User Monitoring solution. This component represents 
the server/persistence of performance metrics. The client side (i.e. running in the customers browser) could/should 
be implemented with the native Web Performance APIs.
   
# Pre-Requisites
MongoServer (at least until this can be integrated with a cloud based MongoDB host)
Node.js/NPM

# Installation
```
$ npm install
```

# Testing
```
$ npm preCommit
```

