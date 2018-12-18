import * as bodyParser from "body-parser";
import express from "express";
import { Controller } from "./controller";
import { JaegerTracer, middlewareTracer } from "jaeger-tracer-decorator";

const jaegerTracer = new JaegerTracer();

const server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

/**
 * Routers
 * */
server.get('/receive', 
  middlewareTracer({tracer: jaegerTracer.tracer}),
  (req: any, res: any, next: any) => {
    const ctrl = new Controller();
    res.send(ctrl.receive(req));
    next();
  }
);

server.get('/send', 
  middlewareTracer({tracer: jaegerTracer.tracer}),
  (req: any, res: any, next: any)  => {
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
server.listen(4002, function () {
  console.log('Example Express listening on port 4002!');
});