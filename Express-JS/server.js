'use strict';
var express = require('express');
var Controller = require("./controller.js")

/**
  * Initialize Server
  */
const server = express();

/**
  * Middleware
  */

 
/**
 * Routers
 * */
server.get('/receive', (req, res, next) => {
  const ctrl = new Controller();
  res.send(ctrl.receive(req));
  next();
});

server.get('/send', (req, res, next) => {
  const ctrl = new Controller();
  ctrl.send(req).then((result) => {
    res.send(result);
    next();
  }).catch((e) => {
    next(e);
  });
});

/**
  * Start Server
  */
server.listen(4001, function () {
  console.log('Example Express listening on port 4001!');
});