'use strict';
require('dotenv').config()

var express = require('express');
var Controller = require("./controller.js")
var JaegerTracer = require("jaeger-tracer-decorator").JaegerTracer;
var middlewareTracer = require("jaeger-tracer-decorator").middlewareTracer;

const jaegerTracer = new JaegerTracer();
/**
  * Initialize Server
  */
const server = express();
const requestTags = ["query", "headers"];
const transformPathInSpanName = (path) => {
  switch (true) {
    case path.startsWith("/receive"):
      return "Receive_API_JS";
    case path.startsWith("/send"):
      return "Send_API_JS";
    default:
      return path;
  }
};

/**
 * Routers
 * */
server.get('/receive', 
  middlewareTracer({tracer: jaegerTracer.tracer, requestTags, transformPathInSpanName }),
  (req, res, next) => {
    const ctrl = new Controller();
    res.send(ctrl.receive(req));
    next();
  }
);

server.get('/send', 
  middlewareTracer({tracer: jaegerTracer.tracer, requestTags, transformPathInSpanName }),
  (req, res, next) => {
    const ctrl = new Controller();
    ctrl.send(req).then((result) => {
      res.send(result);
      next();
    }).catch((e) => {
      next(e);
    });
  }
);

/**
  * Start Server
  */
server.listen(4001, function () {
  console.log('Example Express listening on port 4001!');
});