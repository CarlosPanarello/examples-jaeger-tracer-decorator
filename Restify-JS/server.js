'use strict';
const restify = require('restify');
var Controller = require("./controller.js")
var JaegerTracer = require("jaeger-tracer-decorator").JaegerTracer;
var middlewareTracer = require("jaeger-tracer-decorator").middlewareTracer;

const jaegerTracer = new JaegerTracer();
/**
  * Initialize Server
  */
const server = restify.createServer({
	name: "Example Restify",
	version: "1.0.0",
});

/**
  * Middleware
  */

 server.use(restify.plugins.queryParser());
 server.use(restify.plugins.bodyParser());
 server.use(middlewareTracer({tracer: jaegerTracer.tracer}))
 
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
server.listen(3001, () => {
  console.log('Example Restify listening on port 3001!');
});