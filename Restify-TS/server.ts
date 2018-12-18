import { Controller } from "./controller";
import * as restify from "restify";

const server = restify.createServer({
  name: "Exemple Restify Server Typescript",
  version: "1.0.0",
});

server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

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
server.listen(3002, function () {
  console.log('Example Restify listening on port 3002!');
});