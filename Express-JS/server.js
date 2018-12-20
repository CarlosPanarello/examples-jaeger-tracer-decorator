'use strict';
require('dotenv').config()

var express = require('express');
var Controller = require("./controller.js")
var JaegerTracer = require("jaeger-tracer-decorator").JaegerTracer;
var middlewareTracer = require("jaeger-tracer-decorator").middlewareTracer;

const optionsJaeger = {
  serviceName: "Express_JS",
  serviceVersion: "2.0.0",
  disable: false,
  sampler: {
    type: "const",
    param: 1,
  },
  reporter: {
    logSpans: true,
    agentHost: "jaeger",
    agentPort: 6832,
  },
};
const jaegerTracer = new JaegerTracer(undefined, undefined, optionsJaeger);
/**
  * Initialize Server
  */
const server = express();
var router = express.Router();

const requestTags = ["query","params", "headers"];
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
router.use(middlewareTracer({tracer: jaegerTracer.tracer, requestTags, transformPathInSpanName }));

/**
 * Routers
 * */
router.get('/receive',
  (req, res, next) => {
    const ctrl = new Controller();
    res.send(ctrl.receive(req));
    next();
  }
);

/**
 * Routers
 * */
router.get('/receive/:valorReceive', 
  (req, res, next) => {
    const ctrl = new Controller();
    res.send(ctrl.receive(req));
    next();
  }
);

router.get('/send', 
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

server.use('/', router);

/**
  * Start Server
  */
server.listen(4001, function () {
  console.log('Example Express listening on port 4001!');
});