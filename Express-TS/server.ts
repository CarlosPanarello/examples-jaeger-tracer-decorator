import * as bodyParser from "body-parser";
import express from "express";
import { Controller } from "./controller";

const server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));


/**
 * Routers
 * */
server.get('/receive', (req: any, res: any, next: any) => {
  const ctrl = new Controller();
  res.send(ctrl.receive(req));
  next();
});

server.get('/send', (req: any, res: any, next: any)  => {
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
server.listen(4002, function () {
  console.log('Example Express listening on port 4002!');
});